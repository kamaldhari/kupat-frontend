import { leftUpArrow } from "@/assets/icons";
import { Modal } from "antd";
import Image from "next/image";
import Link from "next/link";
interface ContinueModalProps {
    isOpen: boolean;
    logo: string;
    link: string;
    modalClose: () => void;
}
const ContinueModal = ({ isOpen, logo, link, modalClose }: ContinueModalProps) => {
    const handleCancel = () => {
        modalClose();
    };
    return (
        <Modal width={360} className="slider-modal" centered open={isOpen} footer={null} onCancel={handleCancel}>
            <div className="modal-container">
                <div className="modal-body">
                    <h1 className="modal-txt">הינך מועבר.ת לאתר</h1>
                    <div className="logo">
                        <Image src={logo} alt="siteImage" height={5} width={5} />
                    </div>
                    <h2 className="modal-txt">האם ברצונך להמשיך?</h2>
                </div>
                <div className="modal-footer">
                    <Link href={link || "/"}>
                        <span>המשך</span>
                        <div className="icon">{leftUpArrow}</div>
                    </Link>
                </div>
            </div>
        </Modal>
    );
};

export default ContinueModal;
