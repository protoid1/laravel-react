import { Link } from "@inertiajs/react";

export default function Pagination({Links}){
    return(
        <nav className="text-center mt-4">
            {Links.map(link =>(
                <Link>
                {link.label}
                </Link>
            ))}
        </nav>
    )
}