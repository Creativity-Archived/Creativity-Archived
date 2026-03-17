const webhookUrl = import.meta.env.VITE_DISCORD_WEBHOOK as string | undefined;

export const isValidGithubUrl = (url: string): boolean => {
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

export const submitModToDiscord = async (modLink: string): Promise<void> => {
  if (!webhookUrl) {
    throw new Error("Webhook is not configured.");
  }

  const response = await fetch(webhookUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      content: `New mod submission: ${modLink}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Webhook error (${response.status})`);
  }
};
