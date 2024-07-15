import { SiCplusplus, SiJavascript, SiPython } from "react-icons/si"


const Languages = () => {
  return (
    <div className="mt-12 text-sm">
      <div className="font-bold text-slate-400">Languages</div>
      <div className="mt-5 ml-2 text-slate-400 flex flex-col gap-4">
        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <SiJavascript size={18} /> Javascript
          </div>
          <span className="font-bold">3</span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <SiPython size={18} /> Python
          </div>
          <span className="font-bold">3</span>
        </div>

        <div className="flex justify-between">
          <div className="flex gap-2 items-center">
            <SiCplusplus size={18} /> C++
          </div>
          <span className="font-bold">10</span>
        </div>
      </div>
    </div>
  )
}

export default Languages