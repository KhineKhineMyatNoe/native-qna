import { TextInput } from "react-native";

interface CustomTextInputProps {
    inputValue: string,
    onChangeTxt: ((text: string) => void) 
}
 
const CustomTextInput: React.FC<CustomTextInputProps> = ({ inputValue, onChangeTxt}) => {
    return ( 
        <TextInput
         value={inputValue}
         onChangeText={(text: string) => onChangeTxt(text)}
         style={{ backgroundColor: "#d4cfcf50",
        padding: 20,
        borderRadius: 10
        }}
         />
     );
}
 
export default CustomTextInput;