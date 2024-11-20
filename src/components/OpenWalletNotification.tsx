import { useSelector } from "@/store";
import { Box, Text } from "@chakra-ui/react";
import { Modal } from "antd";

type Props = {};

const OpenWalletNotification = (props: Props) => {
  const setIShowOpenWalletAppModal =
    useSelector.use.setIShowOpenWalletAppModal();
  const isShowOpenWalletAppModal = useSelector.use.isShowOpenWalletAppModal();

  return (
    <Box>
      <Modal
        open={isShowOpenWalletAppModal}
        onClose={() => setIShowOpenWalletAppModal(false)}
        onCancel={() => setIShowOpenWalletAppModal(false)}
        footer={null}
        title={null}
        closeIcon={null}
        className="wallet-notifi-modal"
        centered
        width={320}
      >
        <Box className="space-y-3 py-8">
          <Text
            color="white"
            fontSize="16px"
            fontWeight="800"
            fontFamily="Plus Jakarta Sans"
            textAlign="center"
          >
            Open the connected wallet app and allow the transaction
          </Text>
        </Box>
      </Modal>

      <style jsx global>{`
        .wallet-notifi-modal .ant-modal-content {
          background: #191916;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wallet-notifi-modal .ant-modal-header {
          background: #191916;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        .wallet-notifi-modal .ant-modal-close {
          color: rgba(255, 255, 255, 0.45);
        }
        .wallet-notifi-modal .ant-modal-close:hover {
          color: rgba(255, 255, 255, 0.75);
        }
      `}</style>
    </Box>
  );
};

export default OpenWalletNotification;
