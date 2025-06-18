'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navigation() {
  const pathname = usePathname();

  const baseLinkStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 1.2rem',
    borderRadius: '8px',
    textDecoration: 'none',
    fontWeight: '600',
    fontSize: '1.05rem',
    color: '#555',
    backgroundColor: 'transparent',
    boxShadow: '0 0 0 rgba(0,0,0,0)',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  };

  const activeLinkStyle = {
    background: 'linear-gradient(135deg, #6b73ff 0%, #000dff 100%)',
    color: 'white',
    boxShadow: '0 4px 15px rgba(107, 115, 255, 0.6)',
  };

  const hoverStyle = {
    backgroundColor: '#e0e7ff',
    color: '#3f51b5',
    boxShadow: '0 4px 12px rgba(63, 81, 181, 0.3)',
  };

  const navStyle = {
    padding: '1rem 3rem',
    borderBottom: '1px solid #ddd',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    position: 'sticky',
    top: 0,
    zIndex: 1000,
  };

  return (
    <nav style={navStyle}>
      <ul
        style={{
          display: 'flex',
          gap: '1.8rem',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          justifyContent: 'center',
        }}
      >
        {[
          { href: '/', label: '🏠 หน้าแรก' },
          { href: '/about', label: 'ℹ️ เกี่ยวกับ' },
          { href: '/service', label: '🛠 บริการของเรา' },
          { href: '/contact', label: '📞 ติดต่อ' },
        ].map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              style={{
                ...baseLinkStyle,
                ...(pathname === href ? activeLinkStyle : {}),
              }}
              onMouseEnter={e => {
                if (pathname !== href) e.currentTarget.style.backgroundColor = hoverStyle.backgroundColor;
                if (pathname !== href) e.currentTarget.style.color = hoverStyle.color;
                if (pathname !== href) e.currentTarget.style.boxShadow = hoverStyle.boxShadow;
              }}
              onMouseLeave={e => {
                if (pathname !== href) e.currentTarget.style.backgroundColor = 'transparent';
                if (pathname !== href) e.currentTarget.style.color = baseLinkStyle.color;
                if (pathname !== href) e.currentTarget.style.boxShadow = baseLinkStyle.boxShadow;
              }}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
