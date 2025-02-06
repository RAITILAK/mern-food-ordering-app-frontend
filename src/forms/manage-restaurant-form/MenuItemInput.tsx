// import { Button } from "@/components/ui/button";
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { useFormContext } from "react-hook-form";

// type Props = {
//   index: number;
//   removeMenuItem: () => void;
// };

// const MenuItemInput = ({ index, removeMenuItem }: Props) => {
//   const { control } = useFormContext();

//   return (
//     <div className="flex flex-row items-end gap-2">
//       <FormField
//         control={control}
//         name={`menuItems.${index}.name`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className="flex items-center gap-1">
//               Name <FormMessage />
//             </FormLabel>
//             <FormControl>
//               <Input
//                 {...field}
//                 placeholder="Cheez Pizza"
//                 className="bg-white"
//               />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <FormField
//         control={control}
//         name={`menuItems.${index}.price`}
//         render={({ field }) => (
//           <FormItem>
//             <FormLabel className="flex items-center gap-1">
//               Price ($)
//               <FormMessage />
//             </FormLabel>
//             <FormControl>
//               <Input {...field} placeholder="9.99" className="bg-white" />
//             </FormControl>
//           </FormItem>
//         )}
//       />
//       <Button
//         type="button"
//         onClick={removeMenuItem}
//         className="bg-red-500 max-h-fit self-end"
//       >
//         Remove
//       </Button>
//     </div>
//   );
// };

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

type Props = {
  index: number;
  removeMenuItem: () => void;
};

const MenuItemInput = ({ index, removeMenuItem }: Props) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-row items-end gap-2">
      {/* Name Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.name`}
        rules={{ required: "Name is required" }} // ✅ Add validation rules
        render={({ field }) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="Cheese Pizza"
                className="bg-white"
              />
            </FormControl>
            <FormMessage /> {/* ✅ Display validation message */}
          </FormItem>
        )}
      />

      {/* Price Field */}
      <FormField
        control={control}
        name={`menuItems.${index}.price`}
        rules={{
          required: "Price is required",
          min: { value: 0.01, message: "Price must be greater than 0" },
        }}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Price ($)</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="9.99"
                type="number"
                className="bg-white"
              />
            </FormControl>
            <FormMessage /> {/* ✅ Display validation message */}
          </FormItem>
        )}
      />

      {/* Remove Button */}
      <Button
        type="button"
        onClick={removeMenuItem}
        className="bg-red-500 max-h-fit self-end"
      >
        Remove
      </Button>
    </div>
  );
};

export default MenuItemInput;

// export default MenuItemInput;
