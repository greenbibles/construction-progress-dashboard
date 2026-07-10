(() => {
  const data = window.PROGRESS_DATA;
  const fmt = iso => new Intl.DateTimeFormat("ja-JP", { year:"numeric", month:"long", day:"numeric" }).format(new Date(`${iso}T00:00:00`));
  document.getElementById("project-name").textContent = data.project.name;
  document.getElementById("as-of").textContent = fmt(data.project.asOf);
  document.getElementById("project-status").textContent = data.project.status;
  document.getElementById("current-phase").textContent = data.project.currentPhase;
  document.getElementById("record-start").textContent = fmt(data.project.recordStart);
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
  const firstDay = new Date("2026-07-01T00:00:00").getDay();
  const mondayOffset = (firstDay + 6) % 7;
  for (let i = 0; i < mondayOffset; i++) {
    const empty = document.createElement("div"); empty.className = "calendar-day empty"; calendar.appendChild(empty);
  }
  for (let day = 1; day <= 31; day++) {
    const key = `2026-07-${String(day).padStart(2,"0")}`;
    const event = data.calendar[key];
    const cell = document.createElement("div");
    cell.className = "calendar-day";
    cell.innerHTML = `<span class="num">${day}</span>${event ? `<span class="event ${event.status}">${event.label}</span>` : ""}`;
    calendar.appendChild(cell);
  }

  const log = document.getElementById("recent-log");
  data.recent.forEach(item => {
    const el = document.createElement("div");
    el.className = "log-item";
    el.innerHTML = `<div class="log-date">${item.date.slice(5).replace("-","/")}</div><div class="log-pin ${item.status}"></div><div class="log-body"><strong>${item.actual || "記録なし"}</strong><small>予定：${item.planned || "—"} / 天候：${item.weather}</small></div>`;
    log.appendChild(el);
  });
})();

