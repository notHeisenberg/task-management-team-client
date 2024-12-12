import { useFormContext } from "react-hook-form";
import { MdAttachFile } from "react-icons/md";

const MainSection = () => {
  const { register, setValue, watch } = useFormContext();
  const attachments = watch("attachments") || [];

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);
    setValue("attachments", [...attachments, ...files]);
  };

  const handleAddAttachment = (type) => {
    const newAttachment = {
      type,
      value: "",
    };
    setValue("attachments", [...attachments, newAttachment]);
  };

  const handleRemoveAttachment = (index) => {
    const updatedAttachments = attachments.filter((_, i) => i !== index);
    setValue("attachments", updatedAttachments);
  };

  return (
    <div className="flex flex-col items-center gap-4 h-full rounded-md p-20">
      {/* Title and Description */}
      <div className="w-3/4 p-3 rounded-md border">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            {...register("title", { required: "Title is required" })}
            type="text"
            placeholder="Enter title"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            {...register("content", { required: "Description is required" })}
            rows={3}
            placeholder="Enter description"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
      </div>

      {/* Attachments */}
      <div className="w-3/4 p-3 rounded-md border">
        <label className="block text-sm font-medium mb-2">Attachments</label>
        <div className="flex space-x-4 mb-4">
          <label className="flex items-center space-x-2 px-3 py-2 border rounded cursor-pointer">
            <MdAttachFile className="w-5 h-5" />
            <span>Attach File</span>
            <input
              type="file"
              multiple
              className="hidden"
              onChange={handleFileChange}
            />
          </label>
          <button
            type="button"
            className="flex items-center space-x-2 px-3 py-2 border rounded"
            onClick={() => handleAddAttachment("Google Drive")}
          >
            <MdAttachFile className="w-5 h-5" />
            <span>Google Drive</span>
          </button>
          <button
            type="button"
            className="flex items-center space-x-2 px-3 py-2 border rounded"
            onClick={() => handleAddAttachment("YouTube")}
          >
            <MdAttachFile className="w-5 h-5" />
            <span>YouTube</span>
          </button>
        </div>

        {/* Render Added Attachments */}
        {attachments.length > 0 && (
          <ul className="space-y-2">
            {attachments.map((attachment, index) => (
              <li
                key={index}
                className="flex items-center justify-between px-3 py-2 border rounded"
              >
                {attachment.name || attachment.type || "Unnamed Attachment"}
                <button
                  type="button"
                  className="text-red-500"
                  onClick={() => handleRemoveAttachment(index)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MainSection;