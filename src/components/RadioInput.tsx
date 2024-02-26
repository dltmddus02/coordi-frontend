type props = {group: string; label: string; value: string; onChange: any}
export default function RadioInput({group, label, value, onChange}: props) {
  return (
    <div className="font-semibold">
      <label className="flex justify-start cursor-pointer label">
        <input
          type="radio"
          name={group}
          className="mr-2 radio"
          style={{width: '1rem', height: '1rem', backgroundColor: 'lightblue'}}
          checked={label === value}
          defaultValue={label}
          onChange={onChange}
        />
        <span className="text-base label-text">{label}</span>
      </label>
    </div>
  )
}
