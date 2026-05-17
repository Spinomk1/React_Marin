import { Pencil } from 'lucide-react';

function EditButton() {


    return ( 
        <button title="Modificar" className=" p-2 rounded-lg text-blue-500 hover:bg-blue-50 hover:text-blue-700 transition">
            <Pencil size={18} />
        </button>
     );
}

export default EditButton;