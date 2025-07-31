import { Input } from "../../../components/ui/input"
import { Button } from "../../../components/ui/button"
import {Table, TableHeader, TableBody, TableHead, TableRow, TableCell} from "../../../components/ui/table"
import { FaStar, FaRegStar } from "react-icons/fa";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import ExpertInfo from "./ExpertInfo";

const Expert = () => {
    const [show, setShow] = useState(true)
    const [show2, setShow2] = useState(false)

    const ToggleShow = () => {
        setShow(true)
        setShow2(false)
    }

    const ToggleShow2 = () => {
        setShow2(true)
        setShow(false)
    }
  return (
    <>
        {show ? (
            <div className="pt-[15px] flex flex-col w-[76%] h-[100%]">
            <div className="flex items-center">
              <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
              <h3 className="text-[16px] font-semibold ml-[10px]">Experts</h3>
            </div>
      
            <div className="w-[100%] p-[15px] bg-[#fff] rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
              <div className="w-[100%] flex justify-between">
                  <h3 className="text-[15px] font-[600]">Select from our Sea of Experts</h3>
                  <p className="text-[10px] font-[500] text-[#757575]">*Click on Expert to see more details</p>
              </div>
      
              <div className="flex items-center mt-[25px] mb-[40px]">
                  <Input 
                      className="w-[350px] rounded-full"
                      placeholder="Search Scholarships i.e. Country, price etc."
                  />
                  <Button className="w-[140px] h-10 rounded-full bg-[#0000FF] text-[#fff] ml-[10px]">
                      Search
                  </Button>
              </div>
      
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Years of Experience</TableHead>
                    <TableHead>Expertise</TableHead>
                    <TableHead>Languages Spoken</TableHead>
                    <TableHead>Rating</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow onClick={ToggleShow2} className="cursor-pointer">
                    <TableCell>John Mekkah</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>PhD, Women, STEM, Undergraduates,MSc...</TableCell>
                    <TableCell>English, French</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>John Mekkah</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>PhD, Women, STEM, Undergraduates,MSc...</TableCell>
                    <TableCell>English, French</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>John Mekkah</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>PhD, Women, STEM, Undergraduates,MSc...</TableCell>
                    <TableCell>English, French</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>John Mekkah</TableCell>
                    <TableCell>4</TableCell>
                    <TableCell>PhD, Women, STEM, Undergraduates,MSc...</TableCell>
                    <TableCell>English, French</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                        <FaRegStar size={10} color="#ffcd29" className="mr-[3px]"/>
                      </div>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        ) : null}

        {show2 ? (
            <div className="pt-[15px] flex flex-col w-[76%] h-[100%]">
                <div className="flex items-center">
                    <div className="w-[5px] h-[5px] bg-[#000] rounded-full"></div>
                    <h3 className="text-[16px] font-semibold ml-[10px]">Experts</h3>
                </div>

                <div className="w-[100%] p-[15px] bg-[#fff] overflow-y-scroll rounded-tr-[12px] rounded-bl-[12px] mt-[20px]">
                    <div className="flex w-[100%] justify-between">
                        <div onClick={ToggleShow} className="flex items-center cursor-pointer">
                            <IoIosArrowBack size={18}/>
                            <h4 className="text-[14px] font-[500] ml-[5px] text-[#3b3b3b]">Back To All Experts</h4>
                        </div>
                        <Button className="text-[#fff] bg-[#0000FF] ">
                            Chat Expert
                        </Button>
                    </div>

                    <ExpertInfo />
                </div>
            </div>
        ) : null}
    </>
  )
}

export default Expert
