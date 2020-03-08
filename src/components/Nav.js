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
          {/* <Link href="/[...param]" as={`${nav.asPath}`}> */}
          <Link
            href="/[...param]"
            as={`${process.env.ASSET_PREFIX}${nav.fullPath}`}
          >
            <a>{nav.readme.title || nav.name}</a>
          </Link>
          {nav.nodes.length > 0 && makeNav(nav.nodes)}
        </li>
      ))}
    </ul>
  );
  return makeNav(navs);
}
