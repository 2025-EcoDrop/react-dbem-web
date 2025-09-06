import styles from "../../styles/components/ConfirmModal.module.css";

interface CompleteConfirmModalProps {
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const CompleteConfirmModal = ({ message = "정말 완료하시겠습니까?", onConfirm, onCancel }: CompleteConfirmModalProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>
                        완료
                    </button>
                    <button onClick={onCancel} className={styles.cancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteConfirmModal;
