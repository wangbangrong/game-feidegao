class LoadingUI extends egret.Sprite implements RES.PromiseTaskReporter {
    
        public constructor( w : number, h : number) {
            super();
            this.createView(w, h);
        }
    
        private textField: egret.TextField;
    
        private createView( w : number, h : number): void {
            this.textField = new egret.TextField();
            this.addChild(this.textField);
            this.textField.y = 400;
            this.textField.width = w;
            this.textField.height = h;
            this.textField.textAlign = "center";
        }
    
        public onProgress(current: number, total: number): void {
            this.textField.text = `Loading...${current}/${total}`;
        }
    }
    
    export default LoadingUI;