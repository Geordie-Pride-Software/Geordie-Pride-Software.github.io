const releasesContainer = document.getElementById("releases");
const releasesUrl = "https://api.github.com/repos/Geordie-Pride-Software/OpenFBT/releases?per_page=10";
const githubReleasesUrl = "https://github.com/Geordie-Pride-Software/OpenFBT/releases";

function createLink(url, label) {
    const link = document.createElement("a");
    link.href = url;
    link.textContent = label;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    return link;
}

function formatReleaseDate(dateValue) {
    const date = new Date(dateValue);
    if (Number.isNaN(date.getTime())) {
        return "Release date unavailable";
    }

    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric"
    });
}

function appendInlineMarkdown(parent, text) {
    const tokens = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g);

    for (const token of tokens) {
        if (token.startsWith("**") && token.endsWith("**")) {
            const strong = document.createElement("strong");
            strong.textContent = token.slice(2, -2);
            parent.append(strong);
        } else if (token.startsWith("`") && token.endsWith("`")) {
            const code = document.createElement("code");
            code.textContent = token.slice(1, -1);
            parent.append(code);
        } else if (token.startsWith("*") && token.endsWith("*")) {
            const emphasis = document.createElement("em");
            emphasis.textContent = token.slice(1, -1);
            parent.append(emphasis);
        } else {
            parent.append(document.createTextNode(token));
        }
    }
}

function renderMarkdown(markdown) {
    const notes = document.createElement("div");
    notes.className = "release-notes";
    const lines = markdown.split(/\r?\n/);

    for (let index = 0; index < lines.length;) {
        const line = lines[index].trim();

        if (!line) {
            index += 1;
            continue;
        }

        const heading = line.match(/^#{1,6}\s+(.+)$/);
        if (heading) {
            const element = document.createElement("h3");
            appendInlineMarkdown(element, heading[1]);
            notes.append(element);
            index += 1;
            continue;
        }

        const listMatch = line.match(/^([-*]|\d+\.)\s+(.+)$/);
        if (listMatch) {
            const ordered = /^\d+\.$/.test(listMatch[1]);
            const list = document.createElement(ordered ? "ol" : "ul");

            while (index < lines.length) {
                const item = lines[index].trim().match(/^([-*]|\d+\.)\s+(.+)$/);
                if (!item || /^\d+\.$/.test(item[1]) !== ordered) {
                    break;
                }

                const listItem = document.createElement("li");
                appendInlineMarkdown(listItem, item[2]);
                list.append(listItem);
                index += 1;
            }

            notes.append(list);
            continue;
        }

        const paragraphLines = [];
        while (index < lines.length) {
            const paragraphLine = lines[index].trim();
            if (!paragraphLine || /^#{1,6}\s+/.test(paragraphLine) || /^([-*]|\d+\.)\s+/.test(paragraphLine)) {
                break;
            }

            paragraphLines.push(paragraphLine);
            index += 1;
        }

        const paragraph = document.createElement("p");
        appendInlineMarkdown(paragraph, paragraphLines.join(" "));
        notes.append(paragraph);
    }

    return notes;
}

function renderRelease(release) {
    const card = document.createElement("article");
    card.className = "release-card";

    const heading = document.createElement("h2");
    heading.textContent = release.name || release.tag_name || "OpenFBT release";
    card.append(heading);

    const date = document.createElement("p");
    date.className = "release-date";
    date.textContent = `Released ${formatReleaseDate(release.published_at)}`;
    card.append(date);

    if (release.body) {
        card.append(renderMarkdown(release.body));
    }

    const links = document.createElement("div");
    links.className = "release-links";
    links.append(createLink(release.html_url, "View release on GitHub"));

    for (const asset of release.assets || []) {
        links.append(createLink(asset.browser_download_url, `Download ${asset.name}`));
    }

    card.append(links);
    return card;
}

function showMessage(message, includeLink) {
    const paragraph = document.createElement("p");
    paragraph.className = "message";
    paragraph.setAttribute("role", "status");
    paragraph.textContent = message;

    if (includeLink) {
        paragraph.append(" ");
        paragraph.append(createLink(githubReleasesUrl, "Open the GitHub releases page."));
    }

    releasesContainer.replaceChildren(paragraph);
}

async function loadReleases() {
    try {
        const response = await fetch(releasesUrl, {
            headers: { Accept: "application/vnd.github+json" }
        });

        if (!response.ok) {
            throw new Error(`GitHub returned HTTP ${response.status}.`);
        }

        const releases = await response.json();
        if (!Array.isArray(releases)) {
            throw new Error("GitHub returned an unexpected releases response.");
        }

        if (releases.length === 0) {
            showMessage("No OpenFBT releases are available yet.", false);
            return;
        }

        const list = document.createElement("div");
        list.className = "release-list";
        for (const release of releases) {
            list.append(renderRelease(release));
        }
        releasesContainer.replaceChildren(list);
    } catch (error) {
        console.error("Unable to load OpenFBT releases:", error);
        showMessage("OpenFBT releases could not be loaded right now.", true);
    }
}

loadReleases();
