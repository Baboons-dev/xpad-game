'use client';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Modal } from 'antd';
import num1 from '@/assets/1.svg';
import num2 from '@/assets/2.svg';
import num3 from '@/assets/3.svg';
import num4 from '@/assets/4.svg';
import dash from '@/assets/Dash.svg';
import { Image } from '@chakra-ui/react';
import step1img from '@/assets/step1.png';
import step2img from '@/assets/step2.png';
import step3img from '@/assets/step3.png';
import step4img from '@/assets/step4.png';

interface JumpToTaskModelProps {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
}

const StepsData = [
  {
    title: 'How to get the extension?',
    description:
      'visit the Chrome Web Store and search for xPad (or click here). Once you find it, download and install the extension. After installation, open it to get started.',
    image: step1img,
  },
  {
    title: 'How to use the extension?',
    description:
      'Click on the ‘Go to X’ button within the extension to open the X platform in your browser. Reopen to the extension and navigate to the IXO you want to participate in. Click on the IXO to proceed.',
    image: step2img,
  },
  {
    title: 'How to use the extension?',
    description:
      'When the X profile page opens, you’ll see a ‘Join IXO’ button. Click it to join the IXO. Once you’ve joined, click on ‘View IXO’ to see all the tasks available for that IXO.',
    image: step3img,
  },
  {
    title: 'How to use the extension?',
    description:
      'From here, you can start completing the tasks. These tasks help increase your chances of being whitelisted, so be sure to participate actively!',
    image: step4img,
  },
];

const JumpToTaskModel = ({ isOpen, onClose }: JumpToTaskModelProps) => {
  const [currentStep, setCurrentStep] = useState(1);

  useEffect(() => {
    setCurrentStep(1);
  }, [isOpen]);

  return (
    <Modal
      open={isOpen}
      onCancel={() => onClose(false)}
      footer={null}
      centered
      closable={false}
      styles={{
        content: {
          backgroundColor: 'transparent',
          padding: '15px',
        },
      }}>
      <div
        style={{
          backgroundColor: '#191916',
          padding: ' 32px 28px 24px 28px',
          width: '100%',
          borderRadius: '12px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            justifyContent: 'center',
            width: '100%',
          }}>
          <IconsNumbers num={1} color={currentStep === 1 ? '#BEF642' : '#5F5F5F'} />
          <Image src={dash.src} alt="dash" width={'14px'} height={'auto'} />
          <IconsNumbers num={2} color={currentStep === 2 ? '#BEF642' : '#5F5F5F'} />
          <Image src={dash.src} alt="dash" width={'14px'} height={'auto'} />
          <IconsNumbers num={3} color={currentStep === 3 ? '#BEF642' : '#5F5F5F'} />
          <Image src={dash.src} alt="dash" width={'14px'} height={'auto'} />
          <IconsNumbers num={4} color={currentStep === 4 ? '#BEF642' : '#5F5F5F'} />
        </div>
        <p
          style={{
            color: '#fff',
            fontSize: '22px',
            fontWeight: '800',
            lineHeight: '24px',
            fontFamily: 'Plus Jakarta Sans',
            marginTop: '24px',
            textAlign: 'center',
          }}>
          Use the Chrome Extension
        </p>

        <Image
          src={StepsData[currentStep - 1]?.image.src}
          alt="step"
          width={'287px'}
          height={'161px'}
          borderRadius={'8px'}
          marginTop={'32px'}
        />
        <p
          style={{
            color: '#fff',
            fontSize: '16px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '800',
            marginTop: '26px',
            textAlign: 'center',
            width: '100%',
          }}>
          {StepsData[currentStep - 1]?.title}
        </p>

        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontSize: '14px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '500',
            marginTop: '12px',
            textAlign: 'center',
            width: '100%',
          }}>
          {StepsData[currentStep - 1]?.description}
        </p>

        <button
          onClick={() => {
            if (currentStep < 4) setCurrentStep(currentStep + 1);
            else onClose(false);
          }}
          style={{
            backgroundColor: '#BEF642',
            borderRadius: '50px',
            height: '44px',
            color: '#000',
            fontSize: '14px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '800',
            width: '100%',
            marginTop: '60px',
          }}>
          {currentStep === 4 ? 'Thank you, close' : 'Step ' + (currentStep + 1)}
        </button>
        <p
          style={{
            color: 'rgba(255, 255, 255, 0.60)',
            fontSize: '14px',
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '500',
            cursor: 'pointer',
            marginTop: '20px',
            textAlign: 'center',
            width: '100%',
          }}
          onClick={() => {
            if (currentStep > 1) setCurrentStep(currentStep - 1);
          }}>
          Back
        </p>
      </div>
    </Modal>
  );
};

export default JumpToTaskModel;

interface IconsNumbersProps {
  num: number;
  color: string;
}

const IconsNumbers = ({ num, color }: IconsNumbersProps) => {
  switch (num) {
    case 1:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} fill="none">
          <rect width={29} height={29} x={1} y={1} stroke={color} rx={14.5} />
          <path fill={color} d="M15.041 22.5V12.436h-2.304V10.58h4.48V22.5h-2.176Z" />
        </svg>
      );
    case 2:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} fill="none">
          <rect width={29} height={29} x={1} y={1} stroke={color} rx={14.5} />
          <path
            fill={color}
            d="M11.463 22.5v-1.648l3.232-3.376c.64-.672 1.13-1.205 1.472-1.6.352-.405.597-.752.736-1.04a2.01 2.01 0 0 0 .208-.88c0-.501-.16-.896-.48-1.184-.31-.288-.71-.432-1.2-.432-.512 0-.955.15-1.328.448-.374.288-.646.715-.816 1.28l-1.904-.592c.128-.63.389-1.173.784-1.632.394-.47.874-.827 1.44-1.072a4.441 4.441 0 0 1 1.824-.384c.768 0 1.44.139 2.016.416.586.277 1.04.667 1.36 1.168.33.501.496 1.088.496 1.76 0 .427-.08.848-.24 1.264-.16.416-.4.843-.72 1.28-.32.427-.736.907-1.248 1.44l-2.8 2.944h5.168v1.84h-8Z"
          />
        </svg>
      );
    case 3:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} fill="none">
          <rect width={29} height={29} x={1} y={1} stroke={color} rx={14.5} />
          <path
            fill={color}
            d="M15.297 22.692a4.95 4.95 0 0 1-1.856-.352 4.416 4.416 0 0 1-1.488-1.024 3.6 3.6 0 0 1-.832-1.584l1.904-.672c.192.544.486.96.88 1.248.395.277.859.416 1.392.416.427 0 .795-.08 1.104-.24.32-.16.571-.39.752-.688.182-.31.272-.672.272-1.088 0-.416-.09-.768-.272-1.056a1.702 1.702 0 0 0-.736-.688c-.32-.16-.698-.24-1.136-.24a3.42 3.42 0 0 0-.64.064 2.285 2.285 0 0 0-.576.192l-.496-1.04 3.088-3.52h-4.864v-1.84h7.312v1.712l-3.104 3.632.032-.816c.715.01 1.339.165 1.872.464.534.299.95.71 1.248 1.232.299.523.448 1.136.448 1.84 0 .768-.186 1.461-.56 2.08a3.996 3.996 0 0 1-1.536 1.44c-.65.352-1.386.528-2.208.528Z"
          />
        </svg>
      );
    case 4:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width={31} height={31} fill="none">
          <rect width={29} height={29} x={1} y={1} stroke={color} rx={14.5} />
          <path
            fill={color}
            d="M16.314 22.5v-2.624h-5.472v-1.824l5.344-7.472h2.272v7.472h1.744v1.824h-1.744V22.5h-2.144Zm-3.872-3.664-.384-.784h4.256v-5.76l.56.176-4.432 6.368Z"
          />
        </svg>
      );
  }
};
