import { useState } from "react";
import "./style.css";
import { expData } from "./expData";

// クエストデータ
const quests = {
  A: { name: "裏魔門の守護者", exp: 40203800 },
  B: { name: "裏機構城の絶対者", exp: 85000000 },
  C: { name: "10億ダンジョン", exp: 1000000000 },
};

export default function App() {
  const [startRank, setStartRank] = useState(900);
  const [endRank, setEndRank] = useState(1000);
  const [needExp, setNeedExp] = useState(null);
  const [selectedQuest, setSelectedQuest] = useState(null);
  const [expRate, setExpRate] = useState(1.0);
  const [badgeRate, setbadgeRate] = useState(0);
  const [error, setError] = useState("");


  // 必要経験値計算
  const calcNeedExp = () => {
    if (
      startRank < 1 ||
      endRank < 1 ||
      startRank >= endRank ||
      !expData[startRank] ||
      !expData[endRank]
    ) {
      setNeedExp(null);
      setError("対応していないランクです");
      return;
    }

    const need = expData[endRank][1] - expData[startRank][1];
    setNeedExp(need);
    setError("");         
    setSelectedQuest(null);
  };


  // 周回数計算
  const calcRuns = (need, oneRunExp) => {
    return Math.ceil(need / oneRunExp);
  };

  return (
    <div className="page">
      <div className="card">
        <h1 className="title">パズドラ EXP 計算機</h1>
        <p className="sub">ランク1〜2000対応</p>

        {/* 入力フォーム */}
        <div className="form">
          <label>
            開始ランク
            <input
              type="number"
              value={startRank}
              onChange={(e) => setStartRank(Number(e.target.value))}
            />
          </label>

          <label>
            目標ランク
            <input
              type="number"
              value={endRank}
              onChange={(e) => setEndRank(Number(e.target.value))}
            />
          </label>

          <button onClick={calcNeedExp}>計算する</button>
        </div>
        {error && (
          <p className="error">
            {error}
          </p>
        )}


        {/* 必要経験値表示 */}
        {needExp !== null && (
          <div className="resultBox">
            <p className="resultText">必要経験値</p>
            <p className="resultValue">
              {needExp.toLocaleString()} EXP
            </p>
          </div>
        )}




        {/* クエスト選択 */}
        {needExp !== null && (
          <div className="questButtons">
            <button onClick={() => setSelectedQuest("A")}>
              裏魔門の守護者
            </button>
            <button onClick={() => setSelectedQuest("B")}>
              裏機構城の絶対者
            </button>
            <button onClick={() => setSelectedQuest("C")}>
              10億ダンジョン
            </button>
          </div>
        )}
        {/* 倍率選択 */}
        {needExp !== null && (
          <div className="rateButtons">
            <button
              className={expRate === 1.0 ? "active" : ""}
              onClick={() => setExpRate(1.0)}
            >
              等倍
            </button>

            <button
              className={expRate === 1.69 ? "active" : ""}
              onClick={() => setExpRate(1.69)}
            >
              1.69倍
            </button>

            <button
              className={expRate === 1.9 ? "active" : ""}
              onClick={() => setExpRate(1.9)}
            >
              1.9倍
            </button>

            <button
              className={expRate === 3.61 ? "active" : ""}
              onClick={() => setExpRate(3.61)}
            >
              3.61倍
            </button>

            <button
              className={expRate === 4 ? "active" : ""}
              onClick={() => setExpRate(4)}
            >
              4倍
            </button>
          </div>
        )}

        {/* バッジボーナス選択 */}
        {needExp !== null && (
          <div className="rateButtons">
            <button
              className={badgeRate === 0 ? "active" : ""}
              onClick={() => setbadgeRate(0)}
            >
              なし
            </button>

            <button
              className={badgeRate === 0.05 ? "active" : ""}
              onClick={() => setbadgeRate(0.05)}
            >
              +5%
            </button>

            <button
              className={badgeRate === 0.1 ? "active" : ""}
              onClick={() => setbadgeRate(0.1)}
            >
              +10%
            </button>
          </div>
        )}


        {/* クエスト結果 */}
        {selectedQuest && (
          <div className="resultBox">
            <p className="resultText">
              {quests[selectedQuest].name}
            </p>

            <p>
              1周{" "}
              {Math.floor(
                quests[selectedQuest].exp * expRate * (1 + badgeRate)
              ).toLocaleString()}
              {" "}EXP（{expRate}倍 + {badgeRate * 100}%）
            </p>

            <p className="resultValue">
              必要周回数：
              {calcRuns(
                needExp,
                quests[selectedQuest].exp * expRate * (1 + badgeRate)
              )} 周
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
