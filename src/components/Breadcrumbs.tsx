import React from 'react';
import Link from 'next/link';
import { LeftOutlined } from '@ant-design/icons';
import { Box } from '@chakra-ui/react';

interface BreadcrumbItem {
  label: string;
  link: string;
}

interface BreadcrumbsProps {
  backLink: string;
  items: BreadcrumbItem[];
  activeTab: string;
  color: string;
}

const Breadcrumbs = ({ backLink, items, activeTab, color = '#337BFF' }: BreadcrumbsProps) => {
  return (
    <Box
      style={{
        display: 'flex',
        gap: '14px',
        alignItems: 'center',
        fontSize: '12px',
        fontFamily: 'Plus Jakarta Sans',
        fontWeight: '500',
        color: '#808080',
        marginBottom: '20px',
      }}>
      <Link href={backLink}>
        <p style={{ fontWeight: '700', color: color, cursor: 'pointer' }}>
          <LeftOutlined />
          {` Back`}
        </p>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <p>|</p>
          <Link href={item.link}>
            <p style={{ color: color, cursor: 'pointer' }}>{item.label}</p>
          </Link>
        </React.Fragment>
      ))}
      <p>/</p>
      <p style={{ cursor: 'pointer' }}>{activeTab}</p>
    </Box>
  );
};

export default Breadcrumbs;
