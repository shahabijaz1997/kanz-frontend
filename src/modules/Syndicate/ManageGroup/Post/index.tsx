import Button from "../../../../shared/components/Button";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { toast } from "react-toastify";
import { fileSize } from "../../../../utils/files.utils";
import { toastUtil } from "../../../../utils/toast.utils";
import { useSelector } from "react-redux";
import { RootState } from "../../../../redux-toolkit/store/store";
import { FileType } from "../../../../enums/types.enum";
import BinIcon from "../../../../ts-icons/binIcon.svg";
import FileSVG from "../../../../assets/svg/file.svg";

const Post = () => {
  const language: any = useSelector((state: RootState) => state.language.value);
  const [files, setFiles]: any = useState([]);
  const [loading, setLoading]: any = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file: any = e.target.files?.[0];
    if (file) {
      const fileSizeInMB = fileSize(file.size, "mb");

      if (fileSizeInMB > 10) {
        toast.error(language?.v3?.fundraiser?.file_size_err, toastUtil);
        navigator.vibrate(1000);
        return;
      }

      const allowedFileTypes = [
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/pdf",
      ];
      if (!allowedFileTypes.includes(file.type)) {
        toast.error(language?.v3?.fundraiser?.file_type_err, toastUtil);
        return;
      }
      setFileInformation(file);
      e.target.value = "";
    }
  };
  const setFileInformation = async (file: File) => {
    let size = fileSize(file.size, "mb");
    let type;
    setLoading(true);
    if (file.type.includes("video")) type = FileType.VIDEO;
    else if (file.type.includes("image")) {
      type = FileType.IMAGE;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const img: any = new Image();
        img.src = reader.result;
      };
    } else {
      type = FileType.PDF;
      const reader = new FileReader();
      reader.readAsDataURL(file);
    }
    doUploadUtil(file, size, type);
    setLoading(false);
  };
  const [value, setValue] = useState("");
  const doUploadUtil = (file: any, size: any, type: string) => {
    setFiles((prev: any) => {
      return [...prev, { file, size, type, id: prev.length + 1 }];
    });

    let timer = setTimeout(() => {
      setLoading(false);
      clearTimeout(timer);
    }, 1000);
  };
  return (
    <main>
      <div>
        <h1 className="text-xl font-bold">New Post</h1>
        <div className="flex-col flex mt-4">
          <label className="font-medium text-sm" htmlFor="title">
            Title
          </label>
          <input
            className="p-1.5 mt-2 rounded-lg border-[1px] border-neutral-500"
            name="title"
            id="title"
          ></input>
        </div>
      </div>
      <div className="mt-5">
        <h1 className="font-medium text-sm">Post</h1>
        <label className="text-xs text-[#7B7B7B]" htmlFor="post">
          Includes personalized greeting and confidentiality reminder
        </label>
        <div className="mt-3">
          <ReactQuill theme="snow" value={value} onChange={setValue} />
        </div>
        <span className="mt-2 flex items-center justify-start">
          <Button
          onClick={() => {
            let elem: any =
              document.getElementById("post_uploader");
            elem.click();
          }}
            className="!px-2 !py-1 !font-medium justify-start !text-[black] !border-[black]"
            type="outlined"
          >
            Attach File
          </Button>
          <input
                    type="file"
                    className="hidden"
                    id="post_uploader"  
                    multiple={true}
                    onChange={handleFileUpload}
                  />
          <span className="ml-3 text-xs text-[#7B7B7B]">Max 30 MB</span>
        </span>
        <div className="my-3 w-[30%]">
                {React.Children.toArray(
                  files?.map((doc: any) => {
                    return (
                      <section className="rounded-md bg-cbc-grey-sec px-1 mt-3 py-2 inline-flex items-center justify-between border-[1px] border-neutral-200 w-full">
                        <span className="inline-flex items-center">
                          <div className="rounded-[7px] bg-white shadow shadow-cs-3 w-14 h-14 inline-grid place-items-center">
                            <img src={FileSVG} alt="File" />
                          </div>
                          <span className="inline-flex flex-col items-start ml-3">
                            <h2
                              className="text-sm font-medium text-neutral-900 max-w-[150px] truncate"
                              title={doc?.file?.name}
                            >
                              {doc?.file?.name}
                            </h2>
                          </span>
                        </span>

                        <small>{doc?.size} MB</small>
                        <div
                          className="rounded-lg w-8 h-8 inline-flex items-center flex-row justify-center gap-2 bg-white cursor-pointer"
                          onClick={() => {
                            setFiles((pr: any) => {
                              let files = pr.filter(
                                (p: any) => p.id !== doc.id
                              );
                              return files;
                            });
                          }}
                        >
                          <BinIcon stroke="#404040" />
                        </div>
                      </section>
                    );
                  })
                )}
              </div>
        <span className="flex min-w-full justify-end">
        <Button className="!font-medium">
            {" "}
            Publish Post
          </Button>
        </span>
        

      </div>
    </main>
  );
};
export default Post;
