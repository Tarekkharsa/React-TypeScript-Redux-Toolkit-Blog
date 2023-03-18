import { Link, To } from "react-router-dom";

export default function CustomLink({ href, ...otherProps }: { href: To }) {
  return (
    <>
      <Link to={href}>
        <a {...otherProps} />
      </Link>
    </>
  );
}
