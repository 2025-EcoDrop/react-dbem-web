import { useState } from "react";
import styles from "../../styles/components/FloatingButtonWithPanel.module.css";
import { Medicine } from "../../types/Medicine";

interface FloatingButtonProps {
    onRecommend: (symptom: string) => Promise<Medicine[]>;
}

const FloatingButtonWithPanel= ({ onRecommend }: FloatingButtonProps) => {
    const [open, setOpen] = useState(false);
    const [symptom, setSymptom] = useState("");
    const [result, setResult] = useState<Medicine[]>([]);
    const [loading, setLoading] = useState(false);

    const handleRecommend = async () => {
        if (!symptom.trim()) return;

        setLoading(true);
        const recommended = await onRecommend(symptom);
        setResult(recommended);
        setLoading(false);
    };

    const handleToggle = () => {
        if (open) {
            setSymptom("");
            setResult([]);
            setLoading(false);
        }
        
        setOpen((prev) => !prev);
    };

    return (
        <>
            {open && (
                <div className={styles.panel}>
                    <p className={styles.notice}>
                        *본 내용은 참고용 추천이며, 전문가와의 상담이 꼭 필요합니다.
                    </p>
                    <h4 className={styles.title}>약품 추천</h4>

                    <textarea
                        value={symptom}
                        onChange={(e) => setSymptom(e.target.value)}
                        placeholder="증상을 입력하세요"
                        className={styles.input}
                    />

                    <button onClick={handleRecommend} className={styles.button}>
                        {loading ? "추천 중..." : "추천받기"}
                    </button>

                    {result.length !== 0 && (
                        <div>
                            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
                                추천 약품
                            </p>
                            <ol style={{ paddingLeft: "25px", paddingRight: "25px" }}>
                                {result.map((item, idx) => (
                                    <li key={idx}>제품명: {item.itemName} <br /> 제조사: {item.entpName}</li>
                                ))}
                            </ol>
                        </div>
                    )}
                </div>
            )}

            <button onClick={handleToggle} className={styles.fab}>
                {open ? "×" : "💊"}
            </button>
        </>
    );
};

export default FloatingButtonWithPanel;
