import styles from "../../styles/components/ConfirmModal.module.css";

interface DeleteConfirmModalProps {
    message?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const DeleteConfirmModal = ({ message = "정말 삭제하시겠습니까?", onConfirm, onCancel }: DeleteConfirmModalProps) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <p>{message}</p>
                <div className={styles.buttons}>
                    <button onClick={onConfirm} className={styles.confirm}>
                        삭제
                    </button>
                    <button onClick={onCancel} className={styles.cancel}>
                        취소
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmModal;
