import Pagination from '@/Components/Pagination'
import SelectInput from '@/Components/SelectInput'
import TableHeading from '@/Components/TableHeading'
import TextInput from '@/Components/TextInput'
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from '@/constants'
import { Link, router } from '@inertiajs/react'

export default function TaskTable({
  tasks,
  queryParams = null,
  hideProjectColumn = false,
  projectId = null,
}) {
  queryParams = queryParams || {}

  const sortChanged = name => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === 'asc') {
        queryParams.sort_direction = 'desc'
      } else {
        queryParams.sort_direction = 'asc'
      }
    } else {
      queryParams.sort_field = name
      queryParams.sort_direction = 'asc'
    }

    router.get(
      !hideProjectColumn ? route('task.index') : route('project.show', projectId),
      queryParams,
      { preserveScroll: true },
    )
  }

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value
    } else {
      delete queryParams[name]
    }

    if (!hideProjectColumn) {
      router.get(route('task.index'), queryParams)
    } else {
      router.get(route('project.show', projectId), queryParams)
    }
  }

  const onKeyPress = (name, e) => {
    if (e.key !== 'Enter') return
    searchFieldChanged(name, e.target.value)
  }

  const deleteTask = task => {
    if (!window.confirm('Are you sure you want to delete the task ?')) {
      return
    }
    router.delete(route('task.destroy', task.id), {
      preserveScroll: true,
    })
  }

  return (
    <>
      <div className="overflow-auto">
        {/* <pre>{JSON.stringify(tasks, undefined, 2)}</pre> */}
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <TableHeading
                name="id"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                ID
              </TableHeading>
              <th className="px-3 py-2">Image</th>
              {!hideProjectColumn && <th className="px-3 py-2">Project Name</th>}
              <TableHeading
                name="name"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Name
              </TableHeading>
              <TableHeading
                name="status"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Status
              </TableHeading>
              <TableHeading
                name="created_at"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Created Date
              </TableHeading>
              <TableHeading
                name="due_date"
                sort_field={queryParams.sort_field}
                sort_direction={queryParams.sort_direction}
                sortChanged={sortChanged}
              >
                Due Date
              </TableHeading>
              <th className="px-3 py-2">Created By</th>
              <th className="px-3 py-2 text-right">Actions</th>
            </tr>
          </thead>
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
            <tr className="text-nowrap">
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              {!hideProjectColumn && <th className="px-3 py-2"></th>}
              <th className="px-3 py-2">
                <TextInput
                  className="w-full"
                  defaultValue={queryParams.name}
                  placeholder="Task Name"
                  onBlur={e => searchFieldChanged('name', e.target.value)}
                  onKeyPress={e => onKeyPress('name', e)}
                />
              </th>
              <th className="px-3 py-2">
                <SelectInput
                  className="w-full"
                  defaultValue={queryParams.status}
                  onChange={e => searchFieldChanged('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
              </th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2"></th>
              <th className="px-3 py-2 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {tasks.data.map(task => (
              <tr key={task.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td className="px-3 py-3">{task.id}</td>
                <td className="px-3 py-3">
                  <img src={task.image_path} alt="" style={{ width: 60 }} />
                </td>
                {!hideProjectColumn && <td className="px-3 py-2">{task.project.name}</td>}
                <th className="px-3 py-3 hover:underline text-gray-100 ">
                  <Link href={route('task.show', task.id)}>{task.name}</Link>
                </th>
                <td className="px-3 py-3">
                  <span
                    className={'px-2 py-1 rounded text-white ' + TASK_STATUS_CLASS_MAP[task.status]}
                  >
                    {TASK_STATUS_TEXT_MAP[task.status]}
                  </span>
                </td>
                <td className="px-3 py-3">{task.created_at}</td>
                <td className="px-3 py-3">{task.due_date}</td>
                <td className="px-3 py-3">{task.createdBy.name}</td>
                <td className="px-3 py-3 flex gap-2">
                  <Link
                    href={route('task.edit', task.id)}
                    className="text-blue-600 hover:text-blue-900 dark:text-blue-500 dark:hover:text-blue-400"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={e => deleteTask(task)}
                    className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-400"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Pagination links={tasks.meta.links} />
    </>
  )
}
