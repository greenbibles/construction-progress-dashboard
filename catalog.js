(() => {
  const data = window.PROGRESS_DATA || {};
  const project = data.project || {};
  const materials = Array.isArray(data.materials) ? data.materials : [];
  const element = id => document.getElementById(id);
  const materialId = new URLSearchParams(window.location.search).get("id");
  const allowedPagePath = value =>
    typeof value === "string" &&
    !value.includes("..") &&
    /^materials\/pages\/[a-z0-9-]+\/page-[1-9][0-9]*\.jpg$/i.test(value);

  if (project.name) element("catalog-project-name").textContent = project.name;
  if (project.updatedAt) {
    element("catalog-updated-at").textContent = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo"
    }).format(new Date(project.updatedAt));
  }

  const material = materials.find(item =>
    item?.id === materialId &&
    item.reviewStatus === "reviewed" &&
    Array.isArray(item.catalogPages)
  );
  const pagePrefix = material ? `materials/pages/${material.id}/` : "";
  const pages = material
    ? material.catalogPages.filter(path => allowedPagePath(path) && path.startsWith(pagePrefix))
    : [];

  if (!material || !pages.length) return;

  document.title = `${material.name} カタログ | 工事進捗ダッシュボード`;
  element("catalog-category").textContent = material.category || "材料資料";
  element("catalog-name").textContent = material.name || "材料カタログ";
  element("catalog-source-title").textContent = material.sourceTitle || "確認済みカタログ";
  element("catalog-source-version").textContent = material.sourceVersion || "版未確認";
  element("catalog-page-count").textContent = `${pages.length}ページ`;

  const pageList = element("catalog-pages");
  pages.forEach((path, index) => {
    const figure = document.createElement("figure");
    figure.className = "catalog-page";

    const caption = document.createElement("figcaption");
    caption.textContent = `${index + 1} / ${pages.length}ページ`;

    const link = document.createElement("a");
    link.href = path;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.setAttribute("aria-label", `${material.name}の${index + 1}ページ目を画像で開く`);

    const image = document.createElement("img");
    image.src = path;
    image.alt = `${material.name} カタログ ${index + 1}ページ目`;
    image.decoding = "async";
    image.loading = index === 0 ? "eager" : "lazy";
    if (index === 0) image.fetchPriority = "high";
    image.addEventListener("error", () => {
      figure.classList.add("catalog-page-error");
      image.alt = `${index + 1}ページ目の画像を読み込めませんでした`;
    });

    link.appendChild(image);
    figure.append(caption, link);
    pageList.appendChild(figure);
  });

  element("catalog-content").hidden = false;
  element("catalog-empty").hidden = true;
})();
