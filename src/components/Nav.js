import Link from "next/link";

/**
 * 目录组件
 * @param {*} param0
 */
export default function Nav({ navs }) {
  const makeNav = navs => (
    <ul>
      {navs.map(nav => (
        <li key={nav.id}>
          <Link
            href="/[...param]"
            // as={`${process.env.ASSET_PREFIX}${nav.fullPath}`}
            as={`${process.env.ASSET_PREFIX}${nav.asPath}`}
          >
            <a>{nav.readme.title || nav.name}</a>
          </Link>
          <span style={{color: "#666"}}>{nav.cards.length>0 && " ["+nav.cards.map(c=>c.baseName).join(", ")+"]"}</span>
          {nav.nodes.length > 0 && makeNav(nav.nodes)}
        </li>
      ))}
    </ul>
  );
  return makeNav(navs);
}
