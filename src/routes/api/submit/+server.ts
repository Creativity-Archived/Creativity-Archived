import { json } from "@sveltejs/kit";
import { DISCORD_WEBHOOK } from "$env/static/private";

const isValidGithubUrl = (url: string): boolean => {
  try {
    const parsed = new URL(url);
    return (
      parsed.hostname === "github.com" &&
      parsed.pathname.split("/").filter(Boolean).length >= 2
    );
  } catch {
    return false;
  }
};

export const POST = async ({ request }: { request: Request }) => {
  const { modLink } = (await request.json()) as { modLink?: string };

  if (!modLink || !isValidGithubUrl(modLink)) {
    return json({ error: "Invalid GitHub URL." }, { status: 400 });
  }

  if (!DISCORD_WEBHOOK) {
    return json({ error: "Webhook not configured." }, { status: 500 });
  }

  const response = await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `New mod submission: <${modLink}>`,
    }),
  });

  if (!response.ok) {
    return json({ error: "Webhook failed." }, { status: 500 });
  }

  return json({ ok: true });
};
