// Re-run after every MkDocs Material page navigation
document$.subscribe(() => {
  const path = location.pathname;
  const sidebar = document.querySelector(".md-sidebar--secondary .md-sidebar__scrollwrap");
  const content = document.querySelector(".md-content__inner");
  // Compute how far the current page is nested so we can build correct relative asset links
  const depth = location.pathname.replace(/\/$/, "").split("/").filter(Boolean).length;
  const assetPrefix = depth ? "../".repeat(depth) : "";
  const assetPath = (filename) => `${assetPrefix}assets/${filename}`;

  // --- Rover page logos and Discord button ---
  if (path.includes("/projects/rover")) {
    if (!document.getElementById("rover-logos")) {
      const roverContainer = document.createElement("div");
      roverContainer.id = "rover-logos";
      roverContainer.style.textAlign = "center";
      roverContainer.style.marginTop = "2rem";
      roverContainer.style.opacity = "0.9";
      roverContainer.innerHTML = `
        <img src="${assetPath('logo1.png')}" width="120" style="margin:0.5rem;">
        <img src="${assetPath('logo2.png')}" width="120" style="margin:0.5rem;">
        <br>
        <a href="https://discord.slugbotics.com" target="_blank" class="join-button"
           style="border-radius: 8px; display: inline-block; text-align: center; margin-top: 1rem;">
          Join Our Discord
        </a>
      `;

      if (sidebar) {
        sidebar.appendChild(roverContainer);
      } else if (content) {
        content.appendChild(roverContainer);
      }
    }
    return; // Skip adding the global Slugbotics logo
  }

  // --- Global Slugbotics logo and Discord button (on all other pages) ---
  if (!document.getElementById("global-slugbotics-logo")) {
    const globalContainer = document.createElement("div");
    globalContainer.id = "global-slugbotics-logo";
    globalContainer.style.textAlign = "center";
    globalContainer.style.marginTop = "2rem";
    globalContainer.style.opacity = "0.9";
    globalContainer.innerHTML = `
      <img src="../assets/logo.png" alt="Slugbotics Logo" width="160" style="margin-bottom: 1rem;">
      <br>
      <a href="https://discord.slugbotics.com" target="_blank" class="join-button"
         style="border-radius: 8px; display: inline-block; text-align: center;">
        Join Our Discord
      </a>
    `;

    if (sidebar) {
      sidebar.appendChild(globalContainer);
    } else if (content) {
      content.appendChild(globalContainer);
    }
  }
});
