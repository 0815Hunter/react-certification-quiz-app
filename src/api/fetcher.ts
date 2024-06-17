export const fetcher = (input: RequestInfo | URL, init?: RequestInit | undefined) =>
    fetch(input, init).then((res) => res.json());

export const mutateFetcher = async (input: RequestInfo | URL) => {
    const res = await fetch(input);
    if (!res.ok) {
        throw new Error(res.status.toString());
    }
    return res.json();
};
