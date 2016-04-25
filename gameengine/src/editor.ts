
module editor {


    export const GRID_PIXEL_WIDTH = 50;

    export const GRID_PIXEL_HEIGHT = 50;

    export class WorldMap extends render.DisplayObjectContainer {


        private cache: HTMLCanvasElement;
        public stroke:render.Bitmap;
        public isDirty = true;
        constructor() {

            super();
            this.cache = document.createElement("canvas");
            this.cache.width = 400;
            this.cache.height = 400;
            this.stroke=new render.Bitmap("Stroke.png","stroke");

        }
        getChild(row:number,col:number){
            var rows=mapData.length;
            var cols=mapData[0].length;
            return this.children[row*cols+col];
        }


        render(context: CanvasRenderingContext2D) {
            super.render(context);
        }
    }

    export class Material{
        material:render.Bitmap;
        walkable:number;
        constructor(source:string,name:string,walkable:number) {
            this.material=new render.Bitmap(source,name);
            this.walkable=walkable;

        }
        public setWalkable(walkable:number){
            this.walkable=walkable;
        }
        public IsWalkableMaterial():number{
            return this.walkable;
        }

        
    }
    export class Tile extends render.Bitmap {


        public ownedRow: number;
        public ownedCol: number;
        public walkable: number;
        public material: Material;


        constructor() {
            super("Red.jpg","Tile");
        }

        public setWalkable(value) {
            if(value==0){
                this.material=new Material("Red.jpg","red",value);
            }
            else{
                this.material=new Material("Black.jpg","black",value);
            }
            this.source=this.material.material.source;
            this.name=this.material.material.name;
            this.walkable=value;
        }
        public setMaterial(material:Material){
           this.material=material;
          
           this.source=this.material.material.source;
           this.name=this.material.material.name;
           this.walkable=this.material.walkable;
           
        }
        public toString():string{
            if(this.material.material.name
            ){
            return "row:"+this.ownedRow+"\ncol:"+this.ownedCol+"\nwalkable:"+this.walkable+"\nmaterial:"+this.material.material.name;}
        }
    }
    
    
    export class ControlPanel extends render.DisplayObjectContainer {

        currentmaterial:Material;

  
        constructor(materials:editor.Material[]){
            super();


            var materialradio=new ui.MaterialRadio(materials);
            materialradio.radiobuttons[0].text="Green";
            materialradio.radiobuttons[1].text="Black";
            materialradio.radiobuttons[2].text="Red";
            
            var walkableradio=new ui.WalkableRadio(materials);
            walkableradio.radiobuttons[0].text="Walkable";
            walkableradio.radiobuttons[1].text="Unwalkable";
            
            this.currentmaterial=materialradio.setMaterial;

            var submit=new ui.Button("提交");
            submit.height=50;
            submit.y=230;
            submit.x=50;
            submit.onClick=()=>{
                if(currenttile){
                var rows = mapData.length;
                var cols = mapData[0].length;

                this.currentmaterial=materialradio.setMaterial;
                this.currentmaterial.walkable=walkableradio.walkable;
                
                mapEditor.getChild(currenttile.ownedCol,currenttile.ownedRow).setMaterial(this.currentmaterial);
                information.Update( mapEditor.getChild(currenttile.ownedCol,currenttile.ownedRow));
                }
                else
                alert("请先选择网格");
                

                
            }
            walkableradio.x=120;
            
            this.addChild(materialradio);
            this.addChild(walkableradio);
            this.addChild(submit);
        }
  
        
    
        
    }
}
