window.PROGRESS_DATA = {
  project: {
    name: "新潟港東区西防波堤灯台改良改修工事",
    contractStart: null,
    contractEnd: "2026-09-30",
    recordStart: "2026-03-25",
    asOf: "2026-07-11",
    lastActivity: "2026-07-11",
    updatedAt: "2026-07-12T11:09:00+09:00",
    status: "7月9日 工事再開・施工中",
    currentPhase: "基礎（はつり）",
    sourceFiles: 20,
    note: "履行期限は2026年9月30日です。施工計画書がDropbox上で未ダウンロードのため、基準工程と契約上の進捗率は確認待ちです。7月12日以降は週報の予定欄による見込みで、実施確認後に実績へ更新します。"
  },
  phases: [
    { id: "preparation", name: "準備工", start: "2026-03-25", end: "2026-04-27", status: "completed", label: "実施済み", summary: "着工準備、関係機関への説明等" },
    { id: "scaffold", name: "足場設置", start: "2026-04-23", end: "2026-04-24", status: "completed", label: "実施済み", summary: "足場設置を実施" },
    { id: "surface", name: "下地調整（ケレン）", start: "2026-04-24", end: "2026-05-20", status: "paused", label: "実施後中断", summary: "下地調整と養生まで進行。完了の明記なし" },
    { id: "painting", name: "塗装下塗り", start: "2026-05-25", end: "2026-05-29", status: "not-started", label: "未着手", summary: "計画されたが中断により未着手" },
    { id: "pause", name: "工事中断", start: "2026-05-25", end: "2026-07-08", status: "paused", label: "中断", summary: "5月25日から7月8日まで中断。7月1日以降は再開準備を実施" },
    { id: "restart", name: "工事再開準備", start: "2026-07-01", end: "2026-07-08", status: "completed", label: "再開準備", summary: "中断期間中に再開準備および移動を実施" },
    { id: "foundation", name: "基礎（はつり）", start: "2026-07-09", end: "2026-07-11", status: "in-progress", label: "進行中", summary: "7月9日着手、7月11日まで実施を確認" },
    { id: "foundation-plan", name: "基礎工（予定）", start: "2026-07-12", end: "2026-07-18", status: "planned", label: "予定", summary: "週報予定：はつり、鉄筋・型枠。7月13日は雨予報による休工予定" }
  ],
  recent: [
    { date: "2026-07-11", planned: "基礎（はつり・鉄筋・型枠組立）", actual: "基礎（はつり）", weather: "曇り", status: "completed" },
    { date: "2026-07-10", planned: "基礎（はつり・鉄筋・型枠組立）", actual: "基礎（はつり）", weather: "晴れ", status: "in-progress" },
    { date: "2026-07-09", planned: "基礎（はつり）", actual: "基礎（はつり）", weather: "晴れ", status: "completed" },
    { date: "2026-07-08", planned: "移動日", actual: "移動日", weather: "—", status: "completed" },
    { date: "2026-07-07", planned: "工事再開準備", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-07-06", planned: "工事再開準備", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-07-05", planned: "再開未定", actual: "工事再開準備", weather: "—", status: "completed" },
    { date: "2026-06-30", planned: "休工", actual: "休工", weather: "—", status: "paused" },
    { date: "2026-06-25", planned: "休工", actual: "現場確認", weather: "曇り", status: "completed" }
  ],
  upcoming: [
    { date: "2026-07-12", work: "基礎（はつり・鉄筋・型枠組立）", note: "週報予定" },
    { date: "2026-07-13", work: "休工", note: "雨予報のため" },
    { date: "2026-07-14", work: "基礎（はつり）", note: "週報予定" },
    { date: "2026-07-15", work: "基礎（鉄筋・型枠）", note: "週報予定" },
    { date: "2026-07-16", work: "基礎（鉄筋・型枠）", note: "週報予定" },
    { date: "2026-07-17", work: "基礎（鉄筋・型枠）", note: "週報予定" },
    { date: "2026-07-18", work: "基礎（鉄筋・型枠）", note: "週報予定" },
    { date: "2026-07-19", work: "休工", note: "週報予定" }
  ],
  gallery: [
    { date: "2026-03-30", phase: "着工前", title: "施工前の現況", description: "作業開始前の灯台周辺と施工箇所の状況を記録しました。", image: "gallery/2026-03-30-before.jpg", alt: "着工前の灯台周辺と防波堤の現況" },
    { date: "2026-04-20", phase: "準備工", title: "資機材の搬入", description: "足場材などの資機材を現地へ搬入し、施工準備を進めました。", image: "gallery/2026-04-20-materials.jpg", alt: "灯台脇に搬入された足場用資材" },
    { date: "2026-04-23", phase: "仮設工事", title: "足場の設置", description: "灯台鉄部の作業を安全に行うため、作業用足場を設置しました。", image: "gallery/2026-04-23-scaffold.jpg", alt: "灯台鉄部の周囲に設置された作業用足場" },
    { date: "2026-04-24", phase: "下地調整", title: "塗装面のケレン", description: "既存塗膜や錆を除去する下地調整作業に着手しました。", image: "gallery/2026-04-24-preparation.jpg", alt: "足場を設置した灯台で行う下地調整作業" },
    { date: "2026-05-20", phase: "下地調整", title: "細部の下地調整", description: "接合部を含む鉄部のケレンを進め、塗装前の表面を整えました。", image: "gallery/2026-05-20-surface.jpg", alt: "ケレンで表面を整えた灯台鉄部の接合部" },
    { date: "2026-07-09", phase: "基礎工", title: "基礎はつり前の確認", description: "工事再開後、施工範囲を確認して基礎のはつり作業に着手しました。", image: "gallery/2026-07-09-foundation-before.jpg", alt: "はつり作業前の灯台基礎と施工範囲" },
    { date: "2026-07-10", phase: "基礎工", title: "基礎のはつり", description: "灯台基礎周囲のコンクリートをはつり、次工程に向けて下地を整えました。", image: "gallery/2026-07-10-foundation-complete.jpg", alt: "はつり作業を行った灯台基礎の全景" }
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
    { start: "2026-07-10", end: "2026-07-11", label: "基礎はつり", status: "in-progress" },
    { start: "2026-07-12", end: "2026-07-12", label: "基礎工（予定）", status: "planned" },
    { start: "2026-07-13", end: "2026-07-13", label: "休工（予定）", status: "planned" },
    { start: "2026-07-14", end: "2026-07-14", label: "はつり（予定）", status: "planned" },
    { start: "2026-07-15", end: "2026-07-18", label: "鉄筋・型枠（予定）", status: "planned" },
    { start: "2026-07-19", end: "2026-07-19", label: "休工（予定）", status: "planned" }
  ]
};
