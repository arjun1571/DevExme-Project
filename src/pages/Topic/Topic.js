
import "../../pages/Topic/Topic.scss";


const Topic = () => {
  return (
    <div className="lg:p-10 md:p-5 p-3  h-[100vh]">
      <div className="mt-5 lg:mx-60 md:mx-12 flex justify-around items-center">
        <div>
          <p className="text-4xl font-bold">Create Topic</p>
        </div>
        {/* You can open the modal using ID.showModal() method */}
        <button
          className="btn btn-outline btn-primary btn-sm"
          onClick={() => window.my_modal_3.showModal()}
        >
          Create
        </button>
        <dialog id="my_modal_3" className="modal">
          <form method="dialog" className="modal-box">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
            <p className="font-bold text-lg">Create a topic list</p>
            <p className="my-2 mx-6 mt-5">Topic Name</p>
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xl"
            />
            <button className="btn w-40 flex mx-auto btn-active btn-sm my-2 btn-primary mt-10">Submit</button>
          </form>
        </dialog>
      </div>

      <div className="mt-5 lg:mx-60 md:mx-12">
        <div class="md:w-3/3 py-3">
          <table class="border-collapse border border-slate-700 ... w-full">
            <thead>
              <tr>
                <th class="border border-slate-800 ...">Name</th>
                <th class="border border-slate-800 ...">Created On</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="border border-slate-700 ...">SHL</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
              <tr>
                <td class="border border-slate-700 ...">Ridspot</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
              <tr>
                <td class="border border-slate-700 ...">Seria</td>
                <td class="border border-slate-700 ...">12-20-2023</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Topic;
