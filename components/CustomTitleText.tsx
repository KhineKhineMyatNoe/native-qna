import { Text } from "react-native";



interface CustomTitleTextProps {
    TextData: string
}
 
const CustomTitleText: React.FC<CustomTitleTextProps> = ({TextData}) => {
    return ( 
       <Text style={{ color: "grey", fontSize: 16}} >{TextData}</Text>
     );
}
 
export default CustomTitleText;