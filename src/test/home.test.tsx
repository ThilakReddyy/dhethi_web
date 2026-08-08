import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "@/App";

describe("Dhethi home", () => {
  it("presents Dhethi as a standalone product brand", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /useful software, built all the way through/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/standalone product brand/i)).toBeInTheDocument();
    expect(screen.queryByText(/Thilak Reddy/i)).not.toBeInTheDocument();
  });

  it("links to every live JNTUH Connect surface", () => {
    render(<App />);

    expect(
      screen.getAllByRole("link", { name: /JNTUH Connect/i })[0],
    ).toHaveAttribute("href", "https://jntuhconnect.dhethi.com/");
    expect(screen.getAllByRole("link", { name: /Google Play/i })[0]).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.dhethi.jntuhconnect",
    );
    expect(screen.getAllByRole("link", { name: /App Store/i })[0]).toHaveAttribute(
      "href",
      "https://apps.apple.com/in/app/jntuh-connect/id6790828236",
    );
  });
});
