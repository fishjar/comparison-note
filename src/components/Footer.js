import packageJson from "../../package.json";

/**
 * 页脚
 */
export default function Footer() {
  return (
    <div style={{ textAlign: "center", padding: "12px 0", fontSize: "14px" }}>
      v{packageJson.version}
    </div>
  );
}
