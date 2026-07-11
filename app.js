(() => {
  const data = window.PROGRESS_DATA;
  const fmt = iso => new Intl.DateTimeFormat("ja-JP", { year:"numeric", month:"long", day:"numeric" }).format(new Date(`${iso}T00:00:00`));
  document.getElementById("project-name").textContent = data.project.name;
  document.getElementById("as-of").textContent = fmt(data.project.asOf);
  document.getElementById("project-status").textContent = data.project.status;
  document.getElementById("current-phase").textContent = data.project.currentPhase;
  document.getElementById("record-start").textContent = fmt(data.project.recordStart);
  document.getElementById("contract-end").textContent = fmt(data.project.contractEnd);
  document.getElementById("last-activity").textContent = fmt(data.project.lastActivity);
  document.getElementById("source-count").textContent = data.project.sourceFiles;
  document.getElementById("data-note").textContent = data.project.note;

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
    el.innerHTML = `<div class="log-date">${item.date.slice(5).replace("-","/")}</div><div class="log-pin ${item.status}"></div><div class="log-body"><strong>${item.actual || "記録なし"}</strong><small>予定：${item.planned || "—"} / 天候：${item.weather}</small></div>`;
    log.appendChild(el);
  });
})();
