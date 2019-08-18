import { Component, ViewEncapsulation } from '@angular/core';
import Keyboard from "simple-keyboard";

@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', "../../node_modules/simple-keyboard/build/css/index.css",]
})
export class AppComponent {
  // title = 'angular-simple-keyboard';
  value = "";
  keyboard: Keyboard;

  ngAfterViewInit() {
    this.keyboard = new Keyboard({
      onChange: input => this.onChange(input),
      onKeyPress: button => this.onKeyPress(button),
      theme: "hg-theme-default hg-layout-default myTheme",
      layout: {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "{tab} q w e r t y u i o p [ ] \\",
          "{lock} a s d f g h j k l ; ' {enter}",
          "{shift} z x c v b n m , . / {shift}",
          ".com @ {space}"
        ],
        shift: [
          "~ ! @ # $ % ^ & * ( ) _ + {bksp}",
          "{tab} Q W E R T Y U I O P { } |",
          '{lock} A S D F G H J K L : " {enter}',
          "{shift} Z X C V B N M < > ? {shift}",
          ".com @ {space}"
        ]
      },
      buttonTheme: [
        {
          class: "hg-red",
          buttons: "Q W E R T Y q w e r t y"
        },
        {
          class: "hg-highlight",
          buttons: "Q q"
        }
      ]
    });
  }

  onChange = (input: string) => {
    this.value = input;
    console.log("Input changed", input);
  };

  onKeyPress = (button: string) => {
    console.log("Button pressed", button);

    /**
     * If you want to handle the shift and caps lock buttons
     */
    if (button === "{shift}" || button === "{lock}") this.handleShift();
  };

  onInputChange = (event: any) => {
    this.keyboard.setInput(event.target.value);
  };

  handleShift = () => {
    let currentLayout = this.keyboard.options.layoutName;
    let shiftToggle = currentLayout === "default" ? "shift" : "default";

    this.keyboard.setOptions({
      layoutName: shiftToggle
    });
  };
}
