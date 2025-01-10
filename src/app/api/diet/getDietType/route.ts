import axios from "axios";
import { NextResponse } from "next/server";
import { features } from "process";

export async function POST(req: Request) {
  try{
    const body = await req.json()
    const data = [body.age, ...body.dietGoal, ...body.foodIntolerances, ...body.optionalDiseases, ...body.foodAvoidance]
    const response = await axios.post("https://healthy-you-ai-ba1f1dfba37f.herokuapp.com/predict", {features: data} )
    const diets = ["bezglutenowa",	"bezlaktozowa",	"niskotluszczowa",	"niskoweglowodanowa",	"pescowegetarianska",	"standardowa",	"weganska",	"wegetarianska",	"wysokobialkowa"]
    let result:string[] = []
    response.data.output_array.forEach((element:any, index:any) => {
      if (element === 1) {
        result.push(diets[index])
      }
    });
    return NextResponse.json({ result: result }, { status: 200 });
  } catch(error:any){
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}
