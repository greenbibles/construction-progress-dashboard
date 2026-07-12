(() => {
  const data = window.PROGRESS_DATA;
  const fmt = iso => new Intl.DateTimeFormat("ja-JP", { year:"numeric", month:"long", day:"numeric" }).format(new Date(`${iso}T00:00:00`));
  const fmtShortWithWeekday = iso => {
    const weekday = new Intl.DateTimeFormat("ja-JP", { weekday:"short", timeZone:"Asia/Tokyo" }).format(new Date(`${iso}T00:00:00+09:00`));
    return `${iso.slice(5).replace("-", "/")}（${weekday}）`;
  };
  const setText = (id, value) => {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
  };
  setText("project-name", data.project.name);
  setText("as-of", fmt(data.project.asOf));
  setText("project-status", data.project.status);
  setText("current-phase", data.project.currentPhase);
  setText("record-start", fmt(data.project.recordStart));
  setText("contract-end", fmt(data.project.contractEnd));
  setText("last-activity", fmt(data.project.lastActivity));
  setText("source-count", data.project.sourceFiles);
  setText("updated-at", new Intl.DateTimeFormat("ja-JP", { year:"numeric", month:"long", day:"numeric", hour:"2-digit", minute:"2-digit", timeZone:"Asia/Tokyo", timeZoneName:"short" }).format(new Date(data.project.updatedAt)));

  const chartStart = new Date("2026-03-01T00:00:00");
  const chartEnd = new Date("2026-07-31T00:00:00");
  const span = chartEnd - chartStart;
  const gantt = document.getElementById("gantt");
  data.phases.forEach(phase => {
    const start = new Date(`${phase.start}T00:00:00`);
    const end = new Date(`${phase.end}T00:00:00`);
    const left = Math.max(0, (start - chartStart) / span * 100);
    const width = Math.max(1.3, (end - start + 86400000) / span * 100);
    const row = document.createElement("div");
    row.className = "gantt-row";
    row.innerHTML = `<div class="gantt-label"><strong>${phase.name}</strong><small>${phase.label} ・ ${phase.start.slice(5).replace("-","/")}–${phase.end.slice(5).replace("-","/")}</small></div><div class="gantt-track"><div class="gantt-bar ${phase.status}" style="left:${left}%;width:${width}%" title="${phase.summary}">${phase.label}</div></div>`;
    gantt.appendChild(row);
  });

  const galleryItems = data.gallery || [];
  const gallery = document.getElementById("gallery");
  const galleryMain = document.getElementById("gallery-main");
  const galleryMainImage = document.getElementById("gallery-main-image");
  const galleryCounter = document.getElementById("gallery-counter");
  const galleryDate = document.getElementById("gallery-date");
  const galleryPhase = document.getElementById("gallery-phase");
  const galleryTitle = document.getElementById("gallery-title");
  const galleryDescription = document.getElementById("gallery-description");
  const galleryTabs = document.getElementById("gallery-tabs");
  const galleryPrev = document.getElementById("gallery-prev");
  const galleryNext = document.getElementById("gallery-next");
  const dialog = document.getElementById("gallery-dialog");
  const dialogImage = document.getElementById("dialog-image");
  const dialogDate = document.getElementById("dialog-date");
  const dialogPhase = document.getElementById("dialog-phase");
  const dialogTitle = document.getElementById("dialog-title");
  const dialogDescription = document.getElementById("dialog-description");
  let selectedPhoto = 0;
  const openPhoto = item => {
    dialogImage.src = item.image;
    dialogImage.alt = item.alt;
    dialogDate.textContent = fmt(item.date);
    dialogPhase.textContent = item.phase;
    dialogTitle.textContent = item.title;
    dialogDescription.textContent = item.description;
    dialog.showModal();
  };
  const selectPhoto = index => {
    selectedPhoto = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[selectedPhoto];
    galleryMainImage.src = item.image;
    galleryMainImage.alt = item.alt;
    galleryCounter.textContent = `${String(selectedPhoto + 1).padStart(2, "0")} / ${String(galleryItems.length).padStart(2, "0")}`;
    galleryDate.textContent = fmt(item.date);
    galleryPhase.textContent = item.phase;
    galleryTitle.textContent = item.title;
    galleryDescription.textContent = item.description;
    galleryMain.setAttribute("aria-label", `${item.title}の写真を拡大表示`);
    galleryTabs.querySelectorAll("button").forEach((button, buttonIndex) => {
      const active = buttonIndex === selectedPhoto;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
  };
  galleryItems.forEach((item, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "photo-tab";
    button.setAttribute("role", "tab");
    button.setAttribute("aria-label", `${fmt(item.date)} ${item.title}`);
    button.innerHTML = `<img src="${item.image}" alt="" loading="lazy" decoding="async"><span><time>${item.date.slice(5).replace("-", "/")}</time><strong>${item.title}</strong></span>`;
    button.addEventListener("click", () => selectPhoto(index));
    galleryTabs.appendChild(button);
  });
  if (galleryItems.length) {
    selectPhoto(0);
    galleryMain.addEventListener("click", () => openPhoto(galleryItems[selectedPhoto]));
    galleryPrev.addEventListener("click", () => selectPhoto(selectedPhoto - 1));
    galleryNext.addEventListener("click", () => selectPhoto(selectedPhoto + 1));
    gallery.addEventListener("keydown", event => {
      if (event.key === "ArrowLeft") { event.preventDefault(); selectPhoto(selectedPhoto - 1); }
      if (event.key === "ArrowRight") { event.preventDefault(); selectPhoto(selectedPhoto + 1); }
    });
  }
  document.getElementById("dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => {
    if (event.target === dialog) dialog.close();
  });

  const calendar = document.getElementById("calendar");
  const calendarMonth = document.getElementById("calendar-month");
  const calendarPrev = document.getElementById("calendar-prev");
  const calendarNext = document.getElementById("calendar-next");
  const calendarTitle = document.getElementById("calendar-title");
  const months = [2, 3, 4, 5, 6].map(month => new Date(2026, month, 1));
  let selectedMonth = months.length - 1;
  const dateKey = date => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  const eventFor = key => data.calendarRanges.slice().reverse().find(range => key >= range.start && key <= range.end);
  const renderCalendar = () => {
    const month = months[selectedMonth];
    const year = month.getFullYear();
    const monthNumber = month.getMonth() + 1;
    calendarMonth.textContent = `${year}年${monthNumber}月`;
    calendarTitle.textContent = `${monthNumber}月の工程カレンダー`;
    calendarPrev.disabled = selectedMonth === 0;
    calendarNext.disabled = selectedMonth === months.length - 1;
    calendar.replaceChildren();
    const mondayOffset = (month.getDay() + 6) % 7;
    for (let i = 0; i < mondayOffset; i++) {
      const empty = document.createElement("div"); empty.className = "calendar-day empty"; calendar.appendChild(empty);
    }
    const days = new Date(year, monthNumber, 0).getDate();
    for (let day = 1; day <= days; day++) {
      const key = dateKey(new Date(year, monthNumber - 1, day));
      const event = eventFor(key);
      const cell = document.createElement("div");
      cell.className = "calendar-day";
      cell.innerHTML = `<span class="num">${day}</span>${event ? `<span class="event ${event.status}">${event.label}</span>` : ""}`;
      calendar.appendChild(cell);
    }
    const trailingCells = (7 - ((mondayOffset + days) % 7)) % 7;
    for (let i = 0; i < trailingCells; i++) {
      const empty = document.createElement("div"); empty.className = "calendar-day empty"; calendar.appendChild(empty);
    }
  };
  calendarPrev.addEventListener("click", () => { selectedMonth -= 1; renderCalendar(); });
  calendarNext.addEventListener("click", () => { selectedMonth += 1; renderCalendar(); });
  renderCalendar();

  const log = document.getElementById("recent-log");
  data.recent.forEach(item => {
    const el = document.createElement("div");
    el.className = "log-item";
    el.innerHTML = `<div class="log-date">${fmtShortWithWeekday(item.date)}</div><div class="log-pin ${item.status}"></div><div class="log-body"><strong>${item.actual || "記録なし"}</strong><small>予定：${item.planned || "—"} / 天候：${item.weather}</small></div>`;
    log.appendChild(el);
  });

  const upcoming = document.getElementById("upcoming-log");
  (data.upcoming || []).forEach(item => {
    const el = document.createElement("div");
    el.className = "upcoming-item";
    el.innerHTML = `<div class="upcoming-date">${fmtShortWithWeekday(item.date)}</div><div><strong>${item.work}</strong><small>${item.note}</small></div>`;
    upcoming.appendChild(el);
  });
})();
