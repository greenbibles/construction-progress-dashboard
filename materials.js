(() => {
  const data = window.PROGRESS_DATA || {};
  const project = data.project || {};
  const materialItems = Array.isArray(data.materials) ? data.materials : [];
  const allowedDocumentPath = value => {
    if (typeof value !== "string" || !value || value.includes("..")) return false;
    if (/^https:\/\//i.test(value)) return !/dropbox(?:\.com|usercontent\.com)/i.test(value);
    return /^materials\/(?:catalogs|sds)\/[^?#]+$/i.test(value);
  };
  const materials = materialItems.filter(item =>
    item?.reviewStatus === "reviewed" && allowedDocumentPath(item.catalogPath)
  );

  const element = id => document.getElementById(id);
  const appendText = (parent, tagName, text, className) => {
    const child = document.createElement(tagName);
    if (className) child.className = className;
    child.textContent = text || "—";
    parent.appendChild(child);
    return child;
  };
  const formatDate = value => {
    if (!value) return "更新日未確認";
    return new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Tokyo"
    }).format(new Date(`${value}T00:00:00+09:00`));
  };
  if (project.name) element("materials-project-name").textContent = project.name;
  if (project.updatedAt) {
    element("materials-updated-at").textContent = new Intl.DateTimeFormat("ja-JP", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Tokyo"
    }).format(new Date(project.updatedAt));
  }

  if (!materials.length) return;

  const list = element("materials-list");
  const appendDocumentLink = (parent, href, label) => {
    if (!allowedDocumentPath(href)) return;
    const link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = label;
    parent.appendChild(link);
  };

  const appendCatalogLink = (parent, item) => {
    const pagePaths = Array.isArray(item.catalogPages)
      ? item.catalogPages.filter(path => typeof path === "string" && /^materials\/pages\/[^?#]+\.jpg$/i.test(path) && !path.includes(".."))
      : [];
    if (!pagePaths.length) return;
    const link = document.createElement("a");
    link.href = `catalog.html?id=${encodeURIComponent(item.id)}`;
    link.textContent = "カタログを見る";
    parent.appendChild(link);
  };

  materials.forEach(item => {
    const card = document.createElement("details");
    card.className = "material-card";

    const summary = document.createElement("summary");
    const heading = document.createElement("span");
    heading.className = "material-heading";
    appendText(heading, "span", item.category, "material-category");
    appendText(heading, "strong", item.name);
    appendText(summary, "span", "資料確認済み", "material-state");
    summary.prepend(heading);

    const body = document.createElement("div");
    body.className = "material-body";

    const purpose = document.createElement("section");
    appendText(purpose, "h3", "使い道");
    appendText(purpose, "p", item.purpose);

    const usage = document.createElement("section");
    appendText(usage, "h3", "現場での使い方");
    appendText(usage, "p", item.usageSummary);

    const checks = document.createElement("section");
    appendText(checks, "h3", "使用前の確認");
    const checkList = document.createElement("ul");
    (Array.isArray(item.keyChecks) ? item.keyChecks : []).forEach(check => appendText(checkList, "li", check));
    checks.appendChild(checkList);

    const source = document.createElement("div");
    source.className = "material-source";
    const sourceCopy = document.createElement("p");
    appendText(sourceCopy, "span", "参照資料");
    appendText(sourceCopy, "strong", item.sourceTitle);
    appendText(sourceCopy, "small", `${item.sourceVersion || "版未確認"} / 要約更新 ${formatDate(item.updatedAt)}`);
    const links = document.createElement("div");
    links.className = "material-links";
    appendCatalogLink(links, item);
    appendDocumentLink(links, item.safetyPath, "SDSを見る");
    source.append(sourceCopy, links);

    body.append(purpose, usage, checks, source);
    card.append(summary, body);
    list.appendChild(card);
  });

  element("materials-count").textContent = `${materials.length}件`;
  element("materials-section").hidden = false;
  element("materials-empty").hidden = true;
})();
