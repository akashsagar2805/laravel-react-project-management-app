import InputError from '@/Components/InputError'
import InputLabel from '@/Components/InputLabel'
import SelectInput from '@/Components/SelectInput'
import TextAreaInput from '@/Components/TextAreaInput'
import TextInput from '@/Components/TextInput'
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout'
import { Head, Link, useForm } from '@inertiajs/react'

export default function Create({ auth, projects, users }) {
  const { data, setData, post, processing, errors, progress } = useForm({
    image: '',
    priority: '',
    project_id: '',
    assigned_user_id: '',
    name: '',
    status: '',
    description: '',
    due_date: '',
  })

  const onSubmit = e => {
    e.preventDefault()
    post(route('task.store'))
  }

  return (
    <AuthenticatedLayout
      user={auth.user}
      header={
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
            Create Task
          </h2>
        </div>
      }
    >
      <Head title="Create Task" />
      <div className="py-12">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
            <form
              onSubmit={onSubmit}
              className="p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg"
            >
              <div className="mb-4">
                <InputLabel htmlFor="project_id" value="Task Status" />
                <SelectInput
                  id="project_id"
                  name="project_id"
                  value={data.project_id}
                  className="mt-1 block w-full"
                  onChange={e => setData('project_id', e.target.value)}
                >
                  <option value="">Select Project</option>
                  {projects.data.map(project => (
                    <option key={project.id} value={project.id}>
                      {project.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div>
                <InputLabel htmlFor="task_image_path" value="Task Image" />
                <TextInput
                  id="task_image_path"
                  type="file"
                  name="image"
                  className="mt-1 block w-full"
                  onChange={e => setData('image', e.target.files[0])}
                />
                {progress && (
                  <progress value={progress.percentage} max="100">
                    {progress.percentage}%
                  </progress>
                )}
                <InputError message={errors.image} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_name" value="Task Name" />
                <TextInput
                  id="task_name"
                  type="text"
                  name="name"
                  value={data.name}
                  isFocused={true}
                  className="mt-1 block w-full"
                  onChange={e => setData('name', e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="projct_description" value="Task Description" />
                <TextAreaInput
                  id="projct_description"
                  name="name"
                  value={data.description}
                  className="mt-1 block w-full"
                  onChange={e => setData('description', e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_status" value="Task Status" />
                <SelectInput
                  id="task_status"
                  name="status"
                  value={data.status}
                  className="mt-1 block w-full"
                  onChange={e => setData('status', e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </SelectInput>
                <InputError message={errors.status} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_priority" value="Task Priority" />
                <SelectInput
                  id="task_priority"
                  name="priority"
                  value={data.priority}
                  className="mt-1 block w-full"
                  onChange={e => setData('priority', e.target.value)}
                >
                  <option value="">Select Priority</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </SelectInput>
                <InputError message={errors.priority} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_due_date" value="Task Deadline" />
                <TextInput
                  id="task_due_date"
                  type="date"
                  name="due_date"
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={e => setData('due_date', e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
              <div className="mt-4">
                <InputLabel htmlFor="task_assigned_user_id" value="Task Assigned To" />
                <SelectInput
                  id="task_assigned_user_id"
                  name="assigned_user_id"
                  value={data.assigned_user_id}
                  className="mt-1 block w-full"
                  onChange={e => setData('assigned_user_id', e.target.value)}
                >
                  <option value="">Assigned To</option>
                  {users.data.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.name}
                    </option>
                  ))}
                </SelectInput>
                <InputError message={errors.assigned_user_id} className="mt-2" />
              </div>
              <div className="mt-4 text-right">
                <Link
                  href={route('task.index')}
                  className="bg-gray-100 py-1 px-3 text-gray-800 rounded shadow transition-all hover:bg-gray-200 mr-4"
                >
                  Cancel
                </Link>
                <button className="bg-emerald-500 py-1 px-3 text-white rounded shadow transition all hover:bg-emerald-600">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  )
}
