import Pagination from "@/Components/Pagination";
import SelectInput from "@/Components/SelectInput";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { PROJECT_STATUS_CLASS_MAP, PROJECT_STATUS_TEXT_MAP } from "@/constant.jsx";
import { BeakerIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/16/solid';
import { Head, Link, router } from "@inertiajs/react";

export default function Index({ projects, queryParams = null }) {
    queryParams = queryParams || {};
    const searchFieldChanged = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }

        router.get(route('project.index'), queryParams);
    };
    const onKeyPress = (name, e) => {
        if (e.key !== 'Enter') return;
        searchFieldChanged(name, e.target.value);
    };

    const sortChanged = (name) => {

        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === "asc") {
                queryParams.sort_direction = "desc";
            } else {
                queryParams.sort_direction = "asc";
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = "asc";
        }
        router.get(route('project.index'), queryParams);
    }

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }>
            <Head title="Projects" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th onClick={(e) => sortChanged("id")}> <div className="px-3 py-2 flex items-center justify-between gap-1">ID
                                           
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">IMAGE</th>
                                        <th onClick={(e) => sortChanged("name")}>
                                               <div className="px-3 py-2 flex items-center justify-between gap-1">
                                                NAME
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4" />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={(e) => sortChanged("status")} ><div className="px-3 py-2 flex items-center justify-between gap-1">
                                            STATUS
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4" />
                                                </div>
                                            </div>
                                        </th>
                                        <th onClick={(e) => sortChanged("created_at")}>
                                        <div className="px-3 py-2 flex items-center justify-between gap-1">
                                            CREATE DATE
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4" />
                                                </div>
                                            </div></th>
                                        <th onClick={(e) => sortChanged("due_date")}>
                                        <div className="px-3 py-2 flex items-center justify-between gap-1">
                                            DUE DATE
                                                <div>
                                                    <ChevronUpIcon className="w-4" />
                                                    <ChevronDownIcon className="w-4" />
                                                </div>
                                            </div>
                                        </th>
                                        <th className="px-3 py-2">CREATE BY</th>
                                        <th className="px-3 py-2">ACTIONS</th>
                                    </tr>
                                </thead>
                                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                                    <tr className="text-nowrap">
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2">
                                            <TextInput
                                                className="w-full"
                                                placeholder="Project Name"
                                                onBlur={e => searchFieldChanged('name', e.target.value)}
                                                onKeyPress={e => onKeyPress('name', e)}
                                            />
                                        </th>
                                        <th className="px-3 py-2">
                                            <SelectInput
                                                className="w-full"
                                                onChange={e => searchFieldChanged("status", e.target.value)}>
                                                <option value="">Select Status</option>
                                                <option value="pending">PENDING</option>
                                                <option value="in_progress">PROGRESS</option>
                                                <option value="complete">COMPLETE</option>
                                            </SelectInput>
                                        </th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                        <th className="px-3 py-2"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {projects.data.map((project) => (
                                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={project.id}>
                                            <td className="px-3 py-2">{project.id}</td>
                                            <td className="px-3 py-2"><img src={project.id} alt="" style={{ width: 60 }} /> </td>
                                            <td className="px-3 py-2">{project.name}</td>
                                            <td className="px-3 py-2">
                                                <span className={"px-2 py-1 rounded text-white " + PROJECT_STATUS_CLASS_MAP[project.status]}>
                                                    {PROJECT_STATUS_TEXT_MAP[project.status]}
                                                </span>
                                            </td>
                                            <td className="px-3 py-2">{project.create_at}</td>
                                            <td className="px-3 py-2">{project.due_date}</td>
                                            <td className="px-3 py-2">{project.createdBy.name}</td>
                                            <td className="px-3 py-2 text-right">
                                                <Link href={route("project.edit", project.id)} className="font-medium text-blue-600 
                                            dark: text-blue-500 hover:underline mx-1 ">
                                                    Edit
                                                </Link>
                                                <Link href={route("project.destroy", project.id)} className="font-medium text-red-600 
                                            dark: text-red-500 hover:underline mx-1 ">
                                                    Delete
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <Pagination Links={projects.meta.links} />
                        </div>
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}