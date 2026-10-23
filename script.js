const repositoryList = document.querySelector("#repository-list");
const repositoryCount = document.querySelector("#repository-count");
const status = document.querySelector("#status");

function formatDate(dateString) {
  const date = new Date(`${dateString}T00:00:00`);

  return new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(date);
}

function renderRepository(repository) {
  const item = document.createElement("li");
  item.className = "repository-item";

  const title = document.createElement("h3");
  title.className = "repository-title";

  const link = document.createElement("a");
  link.href = repository.url;
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = repository.name;
  title.append(link);

  const description = document.createElement("p");
  description.className = "repository-description";
  description.textContent = repository.description;

  const metadata = document.createElement("div");
  metadata.className = "repository-meta";

  const language = document.createElement("span");
  language.textContent = repository.language;

  const date = document.createElement("span");
  date.textContent = `Starred ${formatDate(repository.starred_at)}`;

  metadata.append(language, date);
  item.append(title, description, metadata);
  return item;
}

async function loadRepositories() {
  try {
    const response = await fetch("events.json");

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const repositories = await response.json();
    repositoryList.replaceChildren(...repositories.map(renderRepository));
    repositoryCount.textContent = `${repositories.length} repositories`;
    status.textContent = repositories.length ? "" : "No starred repositories yet.";
  } catch (error) {
    status.textContent = "Could not load repositories. Please try again later.";
    console.error("Could not load starred repositories:", error);
  }
}

loadRepositories();