class List extends eui.Component implements  eui.UIComponent {
	public gScroll:eui.Scroller;
	public gList:eui.List;
	static sourceArr:any[]=[];
	static that:any;
	public coll:eui.ArrayCollection;

	public constructor() {
		super();
		List.that=this;
		this.skinName='ListSkin';
	}

	protected partAdded(partName:string,instance:any):void
	{
		super.partAdded(partName,instance);
	}


    protected createChildren():void {
        //先创建一个数组
        for (var i:number = 1; i < 5; i++){
            //给数据中添加一个含有"label"属性的对象
            List.sourceArr.push({label:"item"+i});
        }
        //用ArrayCollection包装
        this.coll = new eui.ArrayCollection(List.sourceArr);
        this.gList.dataProvider = this.coll;

        this.gList.itemRenderer = LabelRenderer;
    }
	public test(n:number,t:string):void {
		let old:any;
		if(this.gList.selectedItem)old=this.gList.selectedItem;
		
		 this.gList.selectedIndex=n;
		 //this.gList.selectedItem.label=t;
		List.sourceArr[n].label=t;
		//List.sourceArr[n].selected=true;
		// this.coll.itemUpdated(this.coll.getItemAt(n));
		this.coll.itemUpdated(this.gList.selectedItem);
		this.coll.itemUpdated(old);
		console.log(List.sourceArr[n]);
		console.log(this.coll);		
	}
}

class LabelRenderer extends eui.ItemRenderer {
    private labelDisplay:eui.Label;
    public constructor(){
        super();
        //自定义的 ItemRenderer
        this.touchChildren = true;
        var bg = new eui.Image("resource/assets/Panel/border.png");
        this.labelDisplay = new eui.Label();
        this.labelDisplay.textColor = 0xfd0000;
        this.addChild( this.labelDisplay );
		this.addEventListener(eui.CollectionEvent.COLLECTION_CHANGE,this.haha,this);
    }
    protected dataChanged():void{
        //数据改变时，会自动调用 dataChanged 这个方法
        //显示数据中的 label 值
        this.labelDisplay.text = this.data.label;
		if(this.selected==true){
			this.labelDisplay.size=40;
		}
		else {
			this.labelDisplay.size=20;
		}
    }
	private haha(){
		console.log('haha');
		
	}
}
