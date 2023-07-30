import { ITEMS_PER_PAGE } from "./constants";
import { RepoContent, Repositories, Repository } from "./types";

const API_URL = "https://api.github.com/";
const API_TOKEN = import.meta.env.VITE_GITHUB_API_KEY;

export async function fetchRepos(
  query: string,
  page: number,
  user?: string,
  org?: string,
  lang?: string
): Promise<Repositories> {
  let repo_url = API_URL + "search/repositories" + `?q=${query}`;
  if (user) {
    repo_url += `+user:${user}`;
  }
  if (org) {
    repo_url += `+org:${org}`;
  }
  if (lang) {
    repo_url += `+language:${lang}`;
  }

  repo_url +=
    `&page=${page}&per_page=${ITEMS_PER_PAGE}` + "&sort=stars&order=desc";

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${API_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const res = await fetch(repo_url, {
    headers: headers,
  });

  const repos = (await res.json()) as Repositories;

  return repos;
}

export async function fetchRepo(id: string): Promise<Repository> {
  const repo_url = API_URL + "repositories/" + id;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${API_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const res = await fetch(repo_url, {
    headers: headers,
  });

  const repo = (await res.json()) as Repository;

  return repo;
}

export async function fetchRepoContents(
  user: string,
  repo: string,
  path?: string
): Promise<RepoContent[]> {
  let repo_url = `${API_URL}repos/${user}/${repo}/contents`;
  if (path) {
    repo_url += `/${path}`;
  }

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${API_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const res = await fetch(repo_url, {
    headers: headers,
  });

  const contents = (await res.json()) as RepoContent[];
  return contents;
}

export async function fetchRepoContent(
  user: string,
  repo: string,
  item: string
): Promise<RepoContent> {
  const repo_url = `${API_URL}repos/${user}/${repo}/contents/${item}`;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${API_TOKEN}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const res = await fetch(repo_url, {
    headers: headers,
  });

  const contents = await res.json();

  return contents;
}
