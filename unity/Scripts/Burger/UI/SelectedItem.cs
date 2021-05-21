using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class SelectedItem
{
    string _name;
    int _count;
    int _price;
    string _drink = "";
    int _drinkPrice = 0;
    string _side = "";
    int _sidePrice = 0;
    List<string> _topping = new List<string>();

    public string GetName()
    {
        return this._name;
    }
    public int GetCount()
    {
        return this._count;
    }
    public int GetTotalPrice()
    {
        return this._count * (this._price + this._drinkPrice + this._sidePrice);
    }

    public void setProperties(string name, int count, int price)
    {
        this._name = name;
        this._count = count;
        this._price = price;
    }


    public List<string> GetOptions()
    {
        List<string> result = new List<string>();
        if (_drink.Length > 0)
            result.Add(_drink);
        if (_side.Length > 0)
            result.Add(_side);
        result.AddRange(_topping);

        return result;
    }

    public string GetNameAndOptions()
    {
        string result = this._name;
        if (GetOptions().Count > 0)
        {
            result += " (";

            foreach (string str in GetOptions())
            {
                result += str + ",";
            }
            result = result.Substring(0, result.Length - 1);
            result += ")";
        }
        return result;
    }

    public bool Equals(string targetNameAndOptions, int targetCount, int targetTotalPrice)
    {
        if (!this.GetNameAndOptions().Equals(targetNameAndOptions))
            return false;
        if (this.GetCount() != targetCount)
            return false;
        if (this.GetTotalPrice() != targetTotalPrice)
            return false;
        return true;
    }

    public bool Equals(SelectedItem target)
    {

        if (!this.GetName().Equals(target.GetName()))
            return false;

        List<string> targetOptions = target.GetOptions();

        if (this.GetOptions().Count != targetOptions.Count)
            return false;

        foreach (string option in this.GetOptions())
        {
            if (!targetOptions.Contains(option))
                return false;
        }

        return true;
    }

    public void AddCount(int count)
    {
        this._count += count;
    }

    public void AddOptions(string category, string option, int optionPrice)
    {
        switch (category)
        {
            case "빼기":
                foreach (string str in this._topping)
                {
                    if (str.Equals(option))
                        return;
                }
                this._topping.Add(option);
                break;
            case "음료":
                this._drink = option;
                this._drinkPrice = optionPrice;
                break;
            case "사이드":
                this._side = option;
                this._sidePrice = optionPrice;
                break;

        }
    }
}