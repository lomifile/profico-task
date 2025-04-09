export async function fetchNews(currentDisplay: string) {
  const req = await fetch(
    "https://newsapi.org/v2/everything?q=" + currentDisplay,
    {
      headers: {
        "X-Api-Key": process.env.API_KEY || "11cdf3c26b5a495f974a6982220061a7",
      },
      method: "GET",
    },
  );

  if (!req.ok) {
    throw new Error("Error");
  }

  return await req.json();
}
