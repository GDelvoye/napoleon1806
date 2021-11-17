//from browser import document, html, svg

let carte_prusse = [1/3, 2/3];
let carte_france= [1/2, 1/2];
function factorial(n){
            let n_facto = 1;
            for (let i = 1; i < n+1; i++){
                n_facto = n_facto * i;
            }
            return n_facto
}

function coef_binomial(n, k){
            if (k>=n){
                return 1
            }
            else{
            return factorial(n)/(factorial(k)*factorial(n-k))
            }
}

function proba_binomial(n,p,k){
            return coef_binomial(n,k)*p**k*(1-p)**(n-k)
}
    
function proba_combat(d_france, d_prusse, perte_france, perte_prusse){
            let proba = 1;
            proba= proba*proba_binomial(d_france,carte_france[0],perte_france);
            proba=proba*proba_binomial(d_prusse, carte_prusse[0], perte_prusse);
            return proba
}

function proba_resultat(d_france, d_prusse){
            let pv_france = 0;
            let p_egal = 0;
            let pv_prusse = 0;
            for (let p_france = 0; p_france < d_france + 1; p_france++){
                for (let p_prusse = 0; p_prusse < d_prusse +1; p_prusse++){
                    if (p_france > p_prusse){
                        pv_france=pv_france+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    }else if (p_france < p_prusse){
                        pv_prusse=pv_prusse+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    } else{
                        p_egal=p_egal+proba_combat(d_france,d_prusse,p_france,p_prusse);
                    }
                }
            }
            return [pv_france, p_egal, pv_prusse]//round(float(pv_france),2), round(float(p_egal),2), round(float(pv_prusse),2)
}
        

/*
let ray = 150;
let values = [1,3];

let colors = ["888888", "FF6600", "3399FF"];

let panel = document["panel"];
let legend = None;

let title = svg.text("", x=200, y=30, font_size=40, text_anchor="middle", style={"stroke": "black"});
panel <= title

paths = {}

function pie_chart(){
    global paths, legend
    # clear SVG document
    for child in panel: # iteration on child nodes
        if child != title:
            panel.removeChild(child)

    # zone for legend
    legend = svg.text("", x=200, y=390,
        font_size=30, text_anchor="middle",
        style={"stroke": "black"})
    panel <= legend


    paths = {}
    data = {}
    for i, cell in enumerate(cells):
        data['Item %s' %(i+1)] = float(cell.text)
	
	title.text = "Probabilites du combat"#cells[1].text#data['Item 0']#proba_resultat(2,1)
	
	v_f, e, v_p = proba_resultat(int(cells[0].text), int(cells[1].text))
	
	data2 = {}
	data2['Prusse: '+str(v_p)] = v_p
	data2['Egalite: '+str(e)] = e
	data2['France: '+str(v_f)] = v_f
	data2 = dict(data2)
    style={"fill-opacity": 1,"stroke": "black","stroke-width": 1}
    width = 3.8 * ray
    height = 2.2 * ray
    x_center = 200
    y_center = 210
    x = x_center
    y = y_center - ray
    total = sum(data2.values())
    items = list(data2.items())
    cumul = 0
    for i, (key, value) in enumerate(items):
        angle1 = 2 * math.pi * cumul
        cumul += float(value) / total
        angle = 2 * math.pi * cumul
        x_end = x_center + ray * math.cos((math.pi / 2) - angle)
        y_end = y_center - ray * math.sin((math.pi / 2) - angle)
        path = "M%s,%s " %(x_center, y_center)
        path += "L%s,%s " %(int(x), int(y))
        if angle - angle1 <= math.pi:
            path += "A%s,%s 0 0,1 " %(ray, ray)
        else:
            path += "A%s,%s 0 1,1 " %(ray, ray)
        path += "%s,%s z" %(int(x_end), int(y_end))
        x, y = x_end, y_end
        color = colors[i % len(colors)]
        style["fill"] = "#" + color
        path = svg.path(d=path, style=style)
        path.bind("mouseover", lambda ev, key=key: show_legend(key))
        path.bind("mouseout", lambda ev, legend=legend: hide_legend(legend))
        panel <= path
        paths[key] = path
}

 show_legend(key):
    legend.text = key

def hide_legend(legend):
    legend.text = ""

def change(rank,offset):
    x = int(cells[int(rank)].text)
    if x + int(offset) >= 0:
        cells[int(rank)].text = x + int(offset)
        pie_chart()

nb_cols = 2
nb_lines = 2

t = html.TABLE()
tb = html.TBODY()
cells = []
#France
row = html.TR()
row <= html.TD("France : ")
b_down = html.BUTTON("-")
b_down.bind("click", lambda ev, x=0: change(x, -1))
row <= html.TD(b_down)
cell = html.SPAN(values[0])
row <= html.TD(cell)
b_up = html.BUTTON("+")
b_up.bind("click", lambda ev, x=0: change(x, 1))
row <= html.TD(b_up)
cells.append(cell)
tb <= row

#Prusse
row = html.TR()
row <= html.TD("Prusse : ")
b_down = html.BUTTON("-")
b_down.bind("click", lambda ev, x=1: change(x, -1))
row <= html.TD(b_down)
cell = html.SPAN(values[1])
row <= html.TD(cell)
b_up = html.BUTTON("+")
b_up.bind("click", lambda ev, x=1: change(x, 1))
row <= html.TD(b_up)
cells.append(cell)
tb <= row


t <= tb
document["data"] <= t

pie_chart()
*/