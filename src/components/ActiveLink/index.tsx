import { LinkProps } from "@prismicio/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { cloneElement, ReactElement } from "react";

interface ActiveLinkProps extends LinkProps{
  children: ReactElement
  activeLinkClassname: string
}

function ActiveLink({children,activeLinkClassname ,...rest} : ActiveLinkProps) {

  const {asPath} = useRouter()
  console.log('asPath :>> ', asPath);
  const className = asPath === rest.href
    ? activeLinkClassname
    : ''

  return (
    <Link
      {...rest}
    >
      {cloneElement(children, {
        className
      })}
    </Link>
  );
}

export default ActiveLink;