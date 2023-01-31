class BooleanTree {
  private data?: any;

  public init = (data: any) => {
    this.data = data;
  };

  private value = (item: any): any => {
    if (!item) {
      return false;
    }
    switch (typeof item) {
      case "object":
        if (Array.isArray(item)) {
          return item.map((i: any) => this.value(i));
        } else {
          return Object.keys(item).map((key: string) => {
            return {
              name: key,
              value: this.value(item[key]),
            };
          });
        }
      case "string":
        return item.length > 0;
      case "number":
        return item > 0;
      case "boolean":
        return item;
      case "undefined":
        return false;
      case "function":
        return item();
      default:
        return false;
    }
  };
  public tree(): Array<any> {
    if (!this.data) {
      throw new Error("No data provided");
    }
    const tree = this.data.map((item: any) => {
      if (Array.isArray(item)) {
        return item.map((i: any) => {
          return {
            key: i,
            value: this.value(i),
          };
        });
      }
      return {
        key: item,
        value: this.value(item),
      };
    });
    // console.log("tree", tree);

    return tree;
  }

  private filter = (item: any, value: boolean): any => {
    console.log("filter", item, value);

    if (Array.isArray(item)) {
      console.log(
        "filter val",
        item.filter((i: any) => this.filter(i, value)),
      );
      return item.filter((i: any) => this.filter(i, value));
    }

    return item.value === value;
  };
  public falsies() {
    const falsies = this.tree().filter((item) => {
      return this.filter(item, false);
    });
    // console.log("falsies", falsies);
    return falsies;
  }
  public truthies() {
    const truthies = this.tree().filter((item) => {
      return this.filter(item, true);
    });
    console.log("truthies", truthies);
    return truthies;
  }
}

export default new BooleanTree();
