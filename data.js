window.PROGRESS_DATA = {
  project: {
    name: "新潟港東区西防波堤灯台改良改修工事",
    contractStart: null,
    contractEnd: "2026-09-30",
    recordStart: "2026-03-25",
    asOf: "2026-07-10",
    lastActivity: "2026-07-10",
    status: "7月9日 工事再開・施工中",
    currentPhase: "基礎（はつり）",
    sourceFiles: 19,
    note: "履行期限は2026年9月30日です。施工計画書がDropbox上で未ダウンロードのため、基準工程と契約上の進捗率は確認待ちです。"
  },
  phases: [
    { id: "preparation", name: "準備工", start: "2026-03-25", end: "2026-04-27", status: "completed", label: "実施済み", summary: "着工準備、関係機関への説明等" },
    { id: "scaffold", name: "足場設置", start: "2026-04-23", end: "2026-04-24", status: "completed", label: "実施済み", summary: "足場設置を実施" },
    { id: "surface", name: "下地調整（ケレン）", start: "2026-04-24", end: "2026-05-20", status: "paused", label: "実施後中断", summary: "下地調整と養生まで進行。完了の明記なし" },
    { id: "painting", name: "塗装下塗り", start: "2026-05-25", end: "2026-05-29", status: "not-started", label: "未着手", summary: "計画されたが中断により未着手" },
    { id: "pause", name: "工事中断", start: "2026-05-25", end: "2026-07-08", status: "paused", label: "中断", summary: "5月25日から7月8日まで中断。7月1日以降は再開準備を実施" },
    { id: "restart", name: "工事再開準備", start: "2026-07-01", end: "2026-07-08", status: "completed", label: "再開準備", summary: "中断期間中に再開準備および移動を実施" },
    { id: "foundation", name: "基礎（はつり）", start: "2026-07-09", end: "2026-07-10", status: "in-progress", label: "進行中", summary: "7月9日着手、7月10日も継続" }
  ],
  recent: [
    { date: "2026-07-10", planned: "基礎（はつり・鉄筋・型枠組立）", actual: "基礎（はつり）", weather: "晴れ", status: "in-progress" },
    { date: "2026-07-09", planned: "基礎（はつり）", actual: "基礎（はつり）", weather: "晴れ", status: "completed" },
    { date: "2026-07-08", planned: "移動日", actual: "移動日", weather: "—", status: "completed" },
    { date: "2026-07-07", planned: "工事再開準備", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-07-06", planned: "工事再開準備", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-07-05", planned: "再開未定", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-06-30", planned: "休工", actual: "休工", weather: "—", status: "paused" },
    { date: "2026-06-25", planned: "休工", actual: "現場確認", weather: "曇り", status: "completed" }
  ],
  calendarRanges: [
    { start: "2026-03-25", end: "2026-04-22", label: "準備工", status: "completed" },
    { start: "2026-04-23", end: "2026-04-24", label: "足場設置", status: "completed" },
    { start: "2026-04-25", end: "2026-04-26", label: "休工", status: "paused" },
    { start: "2026-04-27", end: "2026-04-27", label: "準備工", status: "completed" },
    { start: "2026-04-28", end: "2026-05-20", label: "下地調整", status: "completed" },
    { start: "2026-05-21", end: "2026-05-24", label: "休工", status: "paused" },
    { start: "2026-05-25", end: "2026-06-30", label: "工事中断", status: "paused" },
    { start: "2026-07-01", end: "2026-07-07", label: "中断・再開準備", status: "paused" },
    { start: "2026-07-08", end: "2026-07-08", label: "中断・移動日", status: "paused" },
    { start: "2026-07-09", end: "2026-07-09", label: "工事再開・基礎はつり", status: "completed" },
    { start: "2026-07-10", end: "2026-07-10", label: "基礎はつり", status: "in-progress" }
  ]
};
